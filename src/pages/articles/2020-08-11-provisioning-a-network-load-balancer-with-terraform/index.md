---
title: Provisioning a Network Load Balancer with Terraform
date: ""
layout: post
path: "/provisioning-a-network-load-balancer-with-terraform/"
categories:
  - AWS
  - Terraform
  - Load Balancing
  - Networking
draft: true
description: ""
---

## Why do we use LBs

Putting a load balancer in front of your application is a standard pattern for high availability, automated scaling and security. Luckily, AWS makes it [easy](https://aws.amazon.com/elasticloadbalancing/) for us to provision such resources.

This article is focused on setting up a load balancer using [Terraform](https://www.terraform.io/).

## Different types of load balancers in AWS

There are three different type of load balancers in AWS:

- [Classic](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html)
- [Network Load Balancer (NLB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html)
- [Application Load Balancer (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)

Classic load balancers are becoming a relic of the past, so usually your choice is between an _NLB_ and an _ALB_. They are Layer 4 and Layer 7 load balancers, respectively. They both have a ton of [features](https://aws.amazon.com/elasticloadbalancing/features/). All three are managed infrastructure. Once you create it, AWS will make sure that it's available, and that it's scaled on your behalf.

In this article I'm focusing on the NLB. TODO: As a Layer 4 load balancer, we are handling traffic without considering 

## Setting up a basic load balancer

Setting up a load balancer requires three steps:

- The load balancer itself
- The listeners that will forward the traffic
- The target groups that ensure that the traffic reaches its destination

The most typical setup is to have the load balancer inside a Virtual Private Cloud (VPC), in a public subnet. The instances that we want live in a private subnet inside the same VPC. To protect ourselves against outages, we want to deploy to multiple Availability Zones (AZ).

TODO: diagram public private subnet

Assuming that we have an existing vpc (with the id `vpc_id`), this is the snippet that creates the load balancer.

```hcl
data "aws_subnet_ids" "private" {
  vpc_id = var.vpc_id

  tags = {
    Tier = "Private"
  }
}

resource "aws_lb" "this" {
  name               = "basic-load-balancer"
  load_balancer_type = "network"
  subnets            = data.aws_subnet_ids.private.ids

  enable_cross_zone_load_balancing = true
}
```

The most confusing aspect of the `aws_lb` resource is that it represents both NLBs and ALBs, as specified in the `load_balancer_type`. Some arguments only apply to one type, which means that you've got to read the documentation carefully.

`enable_cross_zone_load_balancing` is an [interesting parameter](https://aws.amazon.com/about-aws/whats-new/2018/02/network-load-balancer-now-supports-cross-zone-load-balancing/). It will help prevent downtimes by sending traffic to other AZs in case of problems. Cross-AZ traffic ain't free, so make that an exception!

### Listeners

Our LB is not being a _good listener_ right now. We've got to fix that. Through the `aws_lb_listener` resource, we tell it which ports it should be checking for connection requests, and what to do with them. We want to listen to both port 80 and 443, so we'll setup two different resources using `for_each`. Let's have a look at the code.

```hcl
variable "ports" {
  type    = map(number)
  default = {
    http  = 80
    https = 443
  }
}

resource "aws_lb_listener" "this" {
  for_each = var.ports

  load_balancer_arn = aws_lb.this.arn

  protocol          = "TCP"
  port              = each.value

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this[each.key].arn
  }
}
```

You see the port coming from our `ports` hash. Next is the `protocol`. If we just want to forward the request, we use TCP or UDP. We can also choose to [terminate the TLS connection](https://aws.amazon.com/about-aws/whats-new/2019/01/network-load-balancer-now-supports-tls-termination/) by using TLS as a protocol. For that we need to set up a certificate, though. TODO: termination as an item?

After port and protocol are set up, we need the action to perform. The most common is to forward it to our receiver target group, although we can do redirects, fixed results, or authentication. I showed how to do that in [this article](../concourse-fly-behind-alb-oidc/).

### Target Groups

The last step is to define the target group(s), so that the load balancer knows how is going to receive the requests. We do that with the `aws_lb_target_group` resource.

#### Instance based

The target group can point to specific instances. That's the default `target_type`. You don't want to specify instances explicitly though (What if they go down?), but rather point to an [autoscaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html).

```hcl
resource "aws_lb_target_group" "this" {
  for_each = var.ports

  port        = each.value
  protocol    = "TCP"
  vpc_id      = var.vpc_id

  stickiness = []

  depends_on = [
    aws_lb.this
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_attachment" "target" {
  for_each = var.ports

  autoscaling_group_name = var.autoscaling_group_name
  alb_target_group_arn   = aws_lb_target_group.this[each.value].arn
}
```

#### IP Based

The other `target_type` is for when you want to specify IPs instead of instance ids.

```hcl
resource "aws_lb_target_group" "this" {
  for_each = var.ports

  port        = each.value
  protocol    = "TCP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  depends_on = [
    aws_lb.this
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_target_group_attachment" "this" {
  for_each = local.ports_ips_product

  target_group_arn  = aws_lb_target_group.this[each.value.port].arn
  target_id         = each.value.ip
  availability_zone = "all"
  port              = each.value
}

locals {
  ports_ips_product = flatten(
    [
      for port in values(var.ports): [
        for eni in keys(data.aws_network_interface.this): {
          port = port
          ip   = data.aws_network_interface.this[eni].private_ip
        }
      ]
    ]
  )
}

data "aws_network_interfaces" "this" {
  filter {
    name   = "description"
    values = ["ENI for target"]
  }
}

data "aws_network_interface" "this" {
  for_each = toset(data.aws_network_interfaces.this.ids)
  id       = each.key
}
```

In this case we have a list of [ENIs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html) that we want to connect to, and we want every a target group for every combination of [port, ip]. That's why we need some loops.

You can connect to [ECS](https://aws.amazon.com/ecs/) for instance with this.

We add a `depends_on` block containing the lb resource so that the dependencies are properly modelled. Otherwise destroying the resource might not work properly

### Healthcheck

Every target group has an associated healthcheck. It comes with some default settings, but you can configure it as well through a `health_check` block.

TODO: security groups

- health check


## Querying a load balancer

We can programmatically find the DNS entry for our newly created LB and query it, thanks to the [aws cli](https://aws.amazon.com/cli/).

```shell
export LB_NAME="basic-load-balancer"
dns=$(aws elb describe-load-balancers --load-balancer-name $LB_NAME | jq -r '.LoadBalancerDescriptions[0].DNSName')
nslookup $dns
```

If there is a registered target, we can query it using the content of `dns` and see that our setup, in fact, works.

## Internal Load Balancers

A load balancer doesn't always have to be publicly available. If you use [VPC endpoints](../understanding-vpc-endpoints/) to keep your traffic inside AWS's network, you'll want to use an internal LB for any VPC endpoint service. In that case you have to set the `internal` parameter to `true`. Moreover, the LB can live in a private subnet.

## Operations

### Monitoring

<figure class="figure">
  <img src="./images/monitoring.png" alt="monitoring" />
  <figcaption class="figure__caption">
  Pretty lines make everything better
  </figcaption>
</figure>

### A word on pricing

As you can see in the [pricing page](https://aws.amazon.com/elasticloadbalancing/pricing/), an NLB has a fixed price, plus a fairly arcane operating cost based on _Load Balancer Capacity Units (LCU)_. Honestly, the easiest way to monitor expenditures is by looking at previous months in the Cost Explorer.

### The performance of an NLB

An NLB _scales_ like there is no tomorrow. Each unique target ip can support 55000 simultaneous connections, and the whole thing should be merrily passing along requests long after your applications have collapsed in a smoking pile of ashes.

## Conclusion


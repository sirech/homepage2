---
title: Making Concourse's fly tool work behind an authenticated ALB
date: "2019-04-13"
layout: post
path: "/concourse-fly-behind-alb-oidc/"
categories:
  - Concourse CI
  - AWS
draft: false
description: "Setting Concourse CI with an authenticated ALB in AWS is an easy way to increase the security of your CI setup, but if you want to still use fly you need to do some adaptations"
---

We recently put a _Concourse CI_ instance behind an authenticated [ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) in _AWS_, to make sure there are two distinct logins happening without having to resort to using a bastion host.

The way this works is that whenever you try to access the URL assigned to _Concourse_, there is a redirection that sends you to the identity provider. Once you log in there (using, hopefully, MFA), a cookie named `AWSELBAuthSessionCookie-0` is set in your browser and then you will reach the tool again.

<!--more-->

The code to do this is fairly straightforward. You set up a new app in your `IdP`, from which you get a `client_id` and a `client_secret`. Then set up a check in the _ALB_ using `terraform`

```hcl
resource "aws_lb_listener" "web-alb" {
  load_balancer_arn = "${aws_lb.web-alb.arn}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = "${aws_acm_certificate_validation.web.certificate_arn}"

  default_action {
    type = "authenticate-oidc"

    authenticate_oidc {
      authorization_endpoint = "${var.idp_url}/oidc/auth"
      client_id              = "${var.client_id_oidc}"
      client_secret          = "${var.client_secret_oidc}"
      issuer                 = "${var.idp_url}/oidc"
      token_endpoint         = "${var.idp_url}/oidc/token"
      user_info_endpoint     = "${var.idp_url}/oidc/me"
    }
  }

  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.web-alb.arn}"
  }
}
```

However, this has an unintended consequence. `fly` also accesses _Concourse CI_ through that URL, and it cannot deal with the redirection. You are not supposed to trigger many things locally, as that should be covered by the pipelines themselves. You still need to upload a pipeline for the first time when you create a new one, and there are commands like `intercept` that you also want to use, so it is nice to have this option open in this setup.

`fly` itself does not help much, so we had to find a workaround. What we did was building a local proxy that forwards the request from `fly` to the _ALB_ and injects the cookie in the request to make it work. The proxy is simply `nginx` with a parametrized configuration, running inside a `Docker` container. One interesting thing to note is that we have to set up some headers to that `intercept` works as well, as it relies on _websockets_.


```nginx
events {
    worker_connections 16;
}

http {
    server {
        listen ${CONCOURSE_PROXY_PORT};
        server_name localhost;

        location / {
            proxy_pass ${CONCOURSE_URL};
            proxy_set_header Cookie AWSELBAuthSessionCookie-0=${COOKIE};

            # Fix `websocket: bad handshake` when using `fly intercept`
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
}
```

This configuration is converted to a valid one in the `CMD` of the container, like this:

```shell
#! /usr/bin/env bash

set -e

# shellcheck disable=SC2016
envsubst '$COOKIE $CONCOURSE_URL $CONCOURSE_PROXY_PORT' < /tmp/nginx.conf.template > /etc/nginx/nginx.conf
nginx -g "daemon off;"
```

We run the container using `docker-compose` and provide the `COOKIE` in an `.env` file.

## Connecting to Concourse

Once the _proxy_ is running, we just need to log in with `fly`. We do that from our `go` script directly:

```shell
goal_login-to-concourse() {
  fly --target aftersales login --concourse-url "http://localhost:$CONCOURSE_PROXY_PORT"
}
```

Here is where we see one of the pain points of this solution. When you try to log in, you see something like this:

```shell
navigate to the following URL in your browser:

  http://localhost:3232/sky/login?redirect_uri=http://127.0.0.1:50449/auth/callback

or enter token manually:
```

that URL won't work. You need to replace the `localhost` part with the actual URL of the _Concourse_ server. We could not really figure out a way to make this a bit more user friendly, so we just need to deal with it.

Getting the cookie is also a bit cumbersome, as you need to get it manually from your browser and put it in the `.env` file. I experimented a bit getting this cookie programatically, but I could not get a decrypted cookie from Chrome, so I just left at this for now.

And that's basically it. It is a bit of a hack, to be honest, but it does the job without having to compromise on the two logins setup that we were after.



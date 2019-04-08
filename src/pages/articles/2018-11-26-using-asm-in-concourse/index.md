---
title: Using AWS Secrets Manager in Concourse
date: "2018-11-26"
layout: post
path: "/using-asm-in-concourse/"
categories:
  - Continuous integration 
  - Terraform
  - AWS Secrets Manager
  - Concourse CI
draft: false
description: "Connecting Concourse CI with AWS Secrets Manager offers you a way of conveniently using secrets in a safe manner"
---

<figure class="figure figure--right">
  <img src="./images/lock.jpg" alt="Keeping it secret" />
  <figcaption class="figure__caption">
    <small class="figure__attribution">
      <span class="figure__attribution-link">
        by FreeImages.com/Braden Hays
      </span>
    </small>
  </figcaption>
</figure>

When I wrote about [modernizing build pipelines](../modernizing-your-build-pipelines) I had a ton of content left that did not quite fit the article. I am going to dump some of that here as small articles. I believe they could be useful as a starting point to go towards a better _CI_ setup.

The first thing I want to talk about is connecting [Concourse CI](https://concourse-ci.org/) with [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/). Why would you want to do that, I picture you asking?

Well, if you have pipelines building stuff, they will probably want to access some secrets at some point. It could be a deploy key to access _Github_, or credentials for `npm` or something else. You don't want to store this in plaintext. If you have had to maintain credentials manually for something like [Jenkins](https://jenkins.io/doc/book/using/using-credentials/) you know that can really suck. But it does not have to. An alternative is to connect `Concourse` and the `AWS Secrets Manager`, using [Terraform](https://www.terraform.io/) to keep everything as code.

<!--more-->

_Concourse_ supports a bunch of [credentials managers](https://concourse-ci.org/creds.html) out of the box. Once you have it configured, your jobs and tasks can access secrets in a very convenient way. It looks as simple as this

```yaml
platform: linux
inputs:
  - name: git
  - name: shared-tasks
params:
  NPM_TOKEN: ((npm_auth_token))
run:
  path: sh
  dir: git
  args:
  - -ec
  - |
    ../shared-tasks/scripts/install-yarn-packages.sh
    ./go linter-js
```

with that, the _linter_ task will have access to the `NPM_TOKEN`, which is needed to pull from a private `npm` repository, in a safe manner. But with a lot of convenience for whoever is writing this pipeline and doesn't want to do a lot of plumbing.

### I gotta get me some of this

First, concourse needs to be started with the right settings, so that it will know to use `ASM` with the right region, and the right path

```bash
/usr/local/bin/concourse web \
  --aws-secretsmanager-region=us-east-1 \
  --aws-secretsmanager-team-secret-template=/concourse-ci/{{.Secret}} \
  --aws-secretsmanager-pipeline-secret-template=/concourse-ci/{{.Secret}}
```

You can use a lot more granularity, and have a `{{.Team}}` or `{{.Pipeline}}` in there, but for this case we want just simple secrets. With this, the instance will be able to find the secrets under the given path with the syntax mentioned above.

### Give me the rights

We are not yet there, though. _Concourse_ needs to be able to access those secrets. You can pass it credentials, but a more secure method is to define an _IAM Role_, as the documentation mentions. This example will work if you are running your CI on EC2. First, the policy

```hcl
resource "aws_iam_policy" "concourse-ci-web" {
  name   = "${aws_iam_role.concourse-ci-web.name}"
  policy = "${data.aws_iam_policy_document.concourse-ci.json}"
}

data "aws_iam_policy_document" "concourse-ci" {
  statement {
    effect = "Allow"

    actions = [
      "secretsmanager:DescribeSecret",
      "secretsmanager:GetSecretValue",
      "kms:Decrypt",
    ]

    resources = [
      "arn:aws:secretsmanager:*:*:secret:concourse-ci/*",
      "arn:aws:secretsmanager:*:*:secret:/concourse-ci/*",
      "${formatlist("arn:aws:kms:*:*:key/%s", var.asm_key_ids)}",
    ]
  }
}
```

then that policy gets connected to a role that is assumed by EC2

```hcl
resource "aws_iam_role" "concourse-ci-web" {
  name               = "concourse-ci-web"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy_ec2.json}"
}

resource "aws_iam_instance_profile" "concourse-ci-web" {
  name = "${aws_iam_role.concourse-ci-web.name}"
  role = "${aws_iam_role.concourse-ci-web.name}"
}

resource "aws_iam_role_policy_attachment" "concourse-ci-web" {
  policy_arn = "${aws_iam_policy.concourse-ci-web.arn}"
  role       = "${aws_iam_role.concourse-ci-web.name}"
}
```

and finally the policy for assuming the role

```hcl
data "aws_iam_policy_document" "assume_role_policy_ec2" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}
```

### That's it?

Well, mostly. The example is not complete, and there will be some more code needed to make it work, but this is the gist of it. The best part is that you set it up once, and then you can access the secrets that you define in that namespace, just like that.


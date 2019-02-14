---
title: Checking the validity of a certificate in Concourse
date: "2019-02-14"
layout: post
path: "/check-certificate-validity-concourse/"
categories:
  - Continuous integration 
  - Concourse CI
  - Certificates
draft: false
description: "If you are managing a certificate for an application, you should make sure you know when it is going to expire. This can be automated as part of your build pipeline"
---

We had a situation recently where a certificate that we created using [LetsEncrypt](https://letsencrypt.org/) was about to expire, and we barely noticed in time thanks to a reminder email. For a variety of reasons we cannot automate the renewal right now, but this made me think that relying on emails begin read on time is just asking for trouble.

What I did was making this check part of our build pipeline in [Concourse](https://concourse-ci.org/), which should be triggered 30 days before the expiration of the certificate, so that we get plenty of time to address it.

<!--more-->

## Repeated checks in Concourse

_Concourse_ uses the [time](https://github.com/concourse/time-resource) resource to model a periodic trigger. You can define a daily check just like this:

```yaml
- name: 24h
  type: time
  source:
    interval: 24h
    start: 11:00 AM
    stop: 11:15 AM
    location: Europe/Berlin
```

Then you can define a job that will be triggered every 24 hours by getting this resource:

```yaml
- name: certificate
  serial: true
  plan:
  - aggregate:
    - get: git
      passed: [prepare]
      trigger: true
    - get: 24h
      trigger: true
    - get: dev-container
      passed: [prepare]
  - task: check-certificate
    image: dev-container
    params:
      CERT: certs/fullchain.pem
    file: git/pipeline/tasks/check-certificate/task.yml
```

Using the timer as a resource is a bit funky compared to what you would do in something like _Jenkins_, but once you get used to how _Concourse_ does things, it makes sense to use a resource to model every "input" coming from the outside.

## Checking the certificate

We can leverage `openssl` to do this check, and integrate it into our pipeline by installing the it on the container as well (through `apk` if you use alpine). The script to check a certificate looks like this:

```bash
#!/bin/sh

set -e

export THIRTY_DAYS=2592000

if openssl x509 -checkend "${THIRTY_DAYS}" -noout -in "${CERT}"
then
  echo "Certificate is good for another day!"
  exit 0
else
  echo "Certificate has expired or will do so within 30 days!"
  exit 1
fi
```

You can see that we are checking the certificate file that is part of the proxy that serves the domain, and not the live URL. This relies on your pipeline running often enough so that what you have there matches what is deployed.

## That's it?

Pretty much! With this check your pipeline will become red one month before the expiration of the cert, giving you ample time to do something about it. Next step could be automating not only the alert, but the renewal of the certificate as well?


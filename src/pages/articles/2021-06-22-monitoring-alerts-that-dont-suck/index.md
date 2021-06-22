---
title: "Monitoring Alerts That Don't Suck"
date: ""
layout: post
path: "/monitoring-alerts-that-dont-suck/"
description: "If you've been part of an On-Call rotation, you know how a bad setup will leave you (literally) sleepless. Let's work on fixing that"
categories:
  - Monitoring
  - Practices
  - Alerts
  - On-Call
draft: true
related:
  - /book-review-prometheus-up-and-running/
  - /setting-up-oauth-for-grafana-with-auth0/
  - /keeping-a-technical-backlog/
image: ./images/cover.png
---

Have you even been part of an [On-Call](https://www.pagerduty.com/resources/learn/call-rotations-schedules/) rotation? If so, you know how annoying it is to have monitoring alerts that you can't trust. If they don't trigger, you'll live in fear of missing an incident. If they trigger too much, they won't let you sleep. Neither case sounds great.

Over the past year and a half, I've been part of projects that practice On-Call. You'd be surprised how easily people get used to situations that are so clearly dysfunctional. In this post I want to talk about how I've tried to improve the quality of our alerts, and thus of our incident management.

## What Is the Goal of Alerting?

Simply put, to detect problems in your application before your customers do. Highly available systems can't afford to wait for a human operator to check if everything looks good. That’s too slow in case of an incident. You want the responsible people to know that something is wrong immediately.

Converting monitoring systems into alerts is a natural transition. In fact, platforms like [DataDog](https://www.datadoghq.com/) or [Splunk](https://www.splunk.com/) include these capabilities as part of their offerings.

Let's say you read one of the [SRE books](https://sre.google/books/), and you're now all about SLAs, error budgets, and all the good stuff. How to distill an alert to its base essence? An alert **has** to fulfill two conditions:

- It triggers when there's a problem (avoids false negatives)
- It doesn't trigger for non-issues (avoids false positives)

When you put it like that, it kind of sounds trivial. You wouldn't believe how often one of the conditions doesn't hold, though. Or both. Let's explore how you end up in this situation.

## The Slow Descent Into Unreliability

As Tolstoy [said](https://en.wikipedia.org/wiki/Anna_Karenina_principle), each unhappy alerting setup is unreliable in its own way. I bet every developer has a story about an error that _just_ wouldn't go away.

There are many causes of untrustworthy alerts: Unstable infrastructure, spikes in traffic, legacy applications that time out randomly. Every failure has an origin buried deeply somewhere.

In my experience, it's not like you get to this point suddenly. Rather, it's a slow decay. Alerts aren't calibrated very well, and they trigger occasionally. It progressively gets worse over time while people get used to it. At some point, it's as if things were _always_ like that. If there's one thing to take from this article: Don't let this happen.

One way or another, we need to consider the possibility of flakiness when designing alerts for our systems.

## Monitoring a Microservice

A comprehensive monitoring setup is a topic for a book, not a blog post. Let's say we're starting small. I want to monitor a single microservice. Keep in mind that these are technical metrics. We’re not measuring business outcomes (yet), as we seek to have a solid base before that. With that in mind, I'm borrowing the [RED method](https://www.weave.works/blog/the-red-method-key-metrics-for-microservices-architecture/). These are the metrics we want to monitor.

- _Rate_: Number of requests
- _Error Rate_: % of failed requests
- _Duration_: Time a request takes. You see it as _latency_ as well.

That’s about it. These three metrics provide a meaningful view into the state of this hypothetical microservice. There are plenty of alert combinations to cover them, though.

### A Reasonable Set of Alerts for Reasonable People

I won't claim that this works in every situation. Still, I've had success lately using alert pairs instead of a single alert.

- _Flatline Alert_: Catch extreme conditions through an absolute threshold, like a service receiving no traffic.
- _Change% Alert_: Catch rapid changes in a metric, like the error rate spiking.

For each of the RED metrics, you deploy a pair of alerts. For instance, to cover the number of requests you have a flatline for zero or close-to-zero requests, and a change alert if traffic drops something like 50% within 15 minutes (tune numbers based on situation).

There's quite a bit of overlap between all these alerts, but at the same time they provide [defense in depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)). Any good incident management system can handle grouping, anyway. The combination of a threshold and a change percentage means that you don't have to be so precise tuning these values.

I like to keep the priorities simple and use one or two different priorities at most. It's tempting to be overly granular, but that can backfire by introducing extra cognitive load.

## Some Ideas to Keep in Mind

There's a lot to say about how to set the alerts and tune them. It's also something that's is dependent on the tools that you use, and how your systems are set up. I'm going to pivot away from these details and talk about good practices and anti-patterns. I believe these are broadly applicable in different contexts.

### Fight Alert Fatigue

Alerts should trigger for conditions that require immediate attention, and for that only. I can't stress this enough. [Alarm fatigue](https://en.wikipedia.org/wiki/Alarm_fatigue) slowly creeps in, and before you know you've internalized that people get paged twenty times a day and it was never any different. Be decisive. If an alert is noisy, change it or delete it. Don't get used to the situation.

### Start Simple

Yes, the latest talk from somebody at [FAANG](https://en.wikipedia.org/wiki/Big_Tech) mentions an intricate setup. I can promise you, there was a ton of iteration to get there. Don't get Big Tech envy. Start simple. It's never too late to introduce extra complexity.

### Multiple Angles

I see people making the mistake of trying to find the perfect alert that exactly covers their service. Such alert will be hard to tune, if it's attainable at all. Instead, a combination of alerts does the job as well, and it's simpler to maintain. Let your tools handle the grouping.

### Have A Playbook

An alert is just the first step. You need to give whoever reacts to it an actionable playbook. Don't make assumptions about their knowledge. Somebody reacting to an alert might not have enough information to handle it. Make their life easier and they'll thank you.

### Seek the Right Metrics

Raw numbers aren't descriptive on their own. An error rate (errors / requests) says more than a count of errors. Similarly, a [percentile](https://www.elastic.co/blog/averages-can-dangerous-use-percentile) says more about your users' experience than an average.

## Avoid Doing This

Surely there's some situation where you can argue that the following practices make sense. Maybe? I think it's a good idea to stay away from them.

### Absolute Thresholds

Absolute thresholds are risky. They're hard to get right, especially if your traffic is spiky or unpredictable. If you somehow manage to get a value that works _now_, that doesn't mean it'll work in the future.

I'd leave absolute thresholds for unequivocal triggers. It's hard to argue that a service getting no requests whatsoever is healthy (unless it's actually deactivated?).

### Creating Alerts Manually

Creating and tuning alerts manually doesn't scale. The more alerts you create, the more visible it becomes. Using [Infrastructure as Code](https://www.hashicorp.com/resources/what-is-infrastructure-as-code) is a much sustainable approach. [Terraform](https://www.terraform.io/) has providers for most of the monitoring players.

### Alerts for Services with Low Traffic

Services that don’t have a lot of traffic are not suited for classical alerts. For instance, using a p50 latency in a service that gets 30 requests per hour is per definition flaky. One or two slow calls are enough to skew the metric so that it triggers an alert. By creating such alerts, you're expecting your downstream dependencies to have a consistency that they might be unable to offer.

My recommendation is to stick to flatline alerts for these types of services. Alternatively, filter the metrics to include events that you can really trust.

## Keep Your Sanity

I firmly believe that it's better to have a more modest setup that your engineers fully trust than a complex one that drives them nuts. Alerts **aren't** stationary but rather evolve constantly. If you have a solid foundation you can refine triggers quickly. If you have a dumpster fire it's hard enough for the whole thing not to collapse.

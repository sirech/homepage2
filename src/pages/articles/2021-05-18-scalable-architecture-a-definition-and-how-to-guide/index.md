---
title: "Scalable Architecture: A Definition and How-To Guide"
date: "2021-05-18"
layout: post
path: "/scalable-architecture-a-definition-and-how-to-guide/"
categories:
  - Practices
  - Architecture
  - Software Engineering
related:
  - /book-review-software-architect-elevator/
  - /why-is-refactoring-your-code-important-in-agile/
  - /what-is-code-duplication-definition-and-overview/
draft: false
description: "Using cloud technologies, it's possible to quickly build a solution with scalable architecture that works in almost any situation."
image: ./images/cover.jpeg 
canonical: https://www.scalyr.com/blog/scalable-architecture/
---

<figure class="figure figure--left">
  <img src="./images/cover.jpeg" alt="Scalable Architecture" />
</figure>

Software applications are more global than ever. A massive upswing in traffic is a lucky tweet away. 

For that reason, teams building platforms have to prepare to ramp up on short notice, and that means building applications with scalable architecture in mind. 

In this post, I'm talking about scalability in software architectures, what it is, and things to keep in mind, such as statelessness, loose coupling, and asynchronous processing.

## What Is a Scalable Architecture?

Scalability is a common [cross-functional requirement](https://en.wikipedia.org/wiki/Non-functional_requirement). Let's see what [Wikipedia has to say about it](https://en.wikipedia.org/wiki/Scalability):

> Scalability is the property of a system to handle a growing amount of work by adding resources to the system.

In other words, a scalable architecture supports higher workloads without any fundamental changes to it. Notice the part about adding resources: Scalability doesn't mean that an application magically handles extra traffic with the same resources. People associate scalability with cloud computing. Why's that? Well, for one, there are some well-known examples of hyperscaling in the cloud, [like Netflix](https://netflixtechblog.com/hyper-scale-vpc-flow-logs-enrichment-to-provide-network-insight-e5f1db02910d). Apart from that, a cloud provider gives you a level of flexibility that on-premises infrastructure just [can't match](https://www.scalyr.com/blog/dont-fight-the-cloud/). You don't need to plan ahead, as you can spin up infrastructure in a matter of minutes. Provisioning this infrastructure through code using a tool like [Terraform](https://www.terraform.io/) has many benefits. It allows you to move fast, experiment, and find the solution that suits your needs. I think relying on the cloud is the default approach for many organizations.

## Why Not Scale Vertically?

Throwing money at the problem by buying bigger hardware is a valid solution in many situations. That's called vertical scalability, where you add more computing power to your existing resources. While simple, it has the drawback that it might become very expensive. It's possible to hit a hard limit where no bigger hardware is even available. That's why adding more copies of the same hardware has become the norm. This is called [horizontal scalability](https://www.scalyr.com/blog/horizontal-scalability-software/). The techniques I'm presenting next are based on this principle.

## Tenets of a Scalable Architecture

If you pick a modern architecture book, like _[Fundamentals of Software Architecture](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)_, you'll quickly realize one thing: There's no such thing as one architecture model. Architectures evolve organically over time. That's why it's pointless to provide a detailed blueprint of what makes an architecture scalable that won't match reality. Nevertheless, some principles apply in most situations. Let's talk about those.

### Statelessness

A system without state is much easier to scale. Imagine you have a web server serving requests. If you follow [RESTful](https://restfulapi.net/) principles, these servers will be stateless. That means that you scale up horizontally by adding extra instances. You send traffic to each by putting a load balancer in front. That's a proven and effective strategy that will take you far. To name another example, let's consider containers. Container technologies, such as [Docker](https://www.docker.com/) and [Kubernetes](https://kubernetes.io/), are everywhere. Spinning up a ton of containers based on automated triggers is something that Kubernetes excels at, especially if there's no need to hold state. Now, a completely stateless application isn't very useful. Think of a social media platform that loses all your messages every time you reload your browser. Not great! However, it's a sensible idea to contain that state as much as possible. In a multitier architecture, you split the application into different layers—for example, presentation, back end, and data layer. Then, you keep the state in the data layer as much as possible. It doesn't make the problem disappear, but it reduces the impact.

### Loose Coupling

Loose coupling means that the distinct subsystems are not strongly connected. Therefore, you modify single components without having to touch their dependencies too much. This is a common pattern in software engineering. What does this have to do with scalability? It simplifies the problem quite a bit! If you have to rework a big chunk of an application, the cost will be prohibitive and wasteful. Besides, not every component in a system has the same requirements regarding scalability. Targeted, granular changes are much more likely to succeed. They are easier to split among teams as well, which is an aspect of scaling that you shouldn't forget. There's a limit to how much a single team can accomplish, after all. This brings us to the topic of [microservices](https://www.scalyr.com/blog/monolith-vs-microservices-how-to-evolve/). Let me be clear: You don't need microservices to scale. But used judiciously, this architecture pattern offers loose coupling in a way that's difficult to replicate in a monolith. There's a challenge, though. Reasoning about distributed systems is hard. I find the concepts of [domain-driven design](https://martinfowler.com/tags/domain%20driven%20design.html) very helpful to deal with this complexity.

### Asynchronous Processing

Even if you partition your system into multiple smaller chunks, they'll still have to communicate with one another. This communication introduces dependencies. Dependencies are bad news. Let's say you have blazingly fast web servers that want to trigger some processing that happens to be slow. Using synchronous communication, they need to wait for this slow process, becoming slow themselves. The solution is to communicate asynchronously. Use events instead of direct calls:

*   A producer sends events to a message queue.
*   A consumer processes the events at its own pace.

As a result, there's no more waiting, and the producer and consumer remain loosely coupled. This pattern is called [event-driven architecture](https://aws.amazon.com/event-driven-architecture/). If events are so good, why not use asynchronous communication from the beginning, then? Well, reasoning about asynchronous communication is hard. It's also harder to test. You see the pattern. Architecture involves trade-offs, and there's no free lunch.

### Leverage Managed Infrastructure

An underrated way to scale your system is to let others do the work for you. Have you decided to use Kubernetes to run your applications? That's fine. Instead of operating clusters, pick a managed service like [AWS EKS](https://aws.amazon.com/eks/). Amazon has a lot of practice running software at scale. That leaves you more time to focus on your core business capabilities. Managed infrastructure shines when you consider data stores. [Distributed SQL](https://cloud.google.com/spanner) databases, [NoSQL](https://aws.amazon.com/dynamodb/), or just [object storage](https://aws.amazon.com/s3/) are all waiting for you. Operating scalable data stores is a hairy problem fraught with pitfalls. I wouldn't recommend it except for technologically mature organizations. For everyone else, it's more cost-effective to delegate the work. A similar approach applies to tools and frameworks. There's a lot of open-source software out there that's battle-tested and available right now. Don't build an internal event-streaming platform when you can use [Kafka](https://kafka.apache.org/).

## Let's Mention Some Antipatterns

In your journey toward a more scalable architecture, there are a few things to avoid:

*   Predicting requirements far in the future. If you build something for what might happen in a few years, you'll spend a lot of effort on something you may never need. It's notoriously difficult to foresee requirements in advance.
*   Going for a Big Bang release. Change things incrementally, one at a time. Small releases minimize risk.
*   Using your gut feeling to make decisions. Gather data to confirm your hypothesis. If you don't have good data, build prototypes to get it.
*   Experimenting. It's easy to become overly conservative. Trying things out is crucial to figuring out what works and what doesn't.

## The Role of Observability in a Scalable System

Observability is another cross-functional requirement. There's [plenty to say](https://www.scalyr.com/blog/observability-production-systems-why-how/) about the topic. Simply put, it measures your ability to observe the system from the outside and understand its current state. What does this have to do with scalability? Quite a bit, in fact. Scaling a system requires understanding its behavior, ideally based on reliable data. Logs, metrics, and traces all give you the information you need to draw conclusions and act when necessary. Building the tooling required for observability is an additional effort that takes you away from your focus. Using an existing solution, like [Scalyr](https://app.scalyr.com/help/how-scalyr-works), is often a better investment.

## An Architecture Needs to Evolve

As I said in the beginning, software architecture isn't set in stone. It's not something that's ever finished, even if your scalability requirements stay consistent for a while. The best advice I can give you is to develop an [evolutionary architecture](https://evolutionaryarchitecture.com/) and react quickly to new findings. That's the agile way.

## Toward a Scalable System

Having to scale is a good problem to have because it means that your application is being used heavily. There's not a single solution to get there. Instead, I recommend breaking down your architecture into smaller, loosely connected components that communicate asynchronously, for the components that require it. Using cloud technologies, it's possible to quickly iterate and build a solution that works in almost any situation.


*This post was published initially in [Scalyr](https://www.scalyr.com/blog/scalable-architecture/).*

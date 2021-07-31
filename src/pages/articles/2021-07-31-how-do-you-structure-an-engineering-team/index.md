---
title: "How Do You Structure an Engineering Team?"
date: "2021-07-31"
layout: post
path: "/how-do-you-structure-an-engineering-team/"
categories:
  - Practices
  - Software Engineering
  - Agile
  - Team Organization
related:
  - /book-review-team-topologies/
  - /dev-huddle-as-a-tool-to-achieve-alignment-among-developers/
  - /keeping-a-technical-backlog/
draft: false
description: "An engineering team structure is about finding a way to provide autonomy, mastery, and purpose to its team members. Let's explore more."
image: ./images/cover.jpeg 
canonical: https://linearb.io/blog/engineering-team-structure/
---

<figure class="figure figure--left">
  <img src="./images/cover.jpeg" alt="Engineering Team" />
</figure>

In my [previous piece](../choosing-an-engineering-organizational-structure/), I talked about choosing an engineering organizational structure. Once you have this structure in place, the internal structure of the engineering teams comes next. What does a high-performing engineering team look like?

Organization and team building are similar but not the same. The design of an organization focuses on the interactions between teams and high-level areas of ownership, whereas building a team involves thinking about the interactions of individual contributors. 

In this post, I want to discuss how to enhance a scalable organization model with agile, cross-functional teams that practice [continuous delivery](https://continuousdelivery.com/).

## Think Products, Not Projects

A common mistake in some older approaches is treating teams as fungible. Management decides to build something, forms a team for half a year, then disbands it. This approach doesn't work for long-lived software applications. [Agile development](https://en.wikipedia.org/wiki/Agile_software_development) relies on constant iteration. A project-based team won't have enough time to gel. With little cohesion, it will struggle.

[Product thinking](https://www.interaction-design.org/literature/topics/product-thinking) has replaced this approach. Long-term teams based around products (or at least [streams of work](https://teamtopologies.com/)) enable the people working on it to iterate and collaborate effectively. Over time, they acquire a deep knowledge of their domain to the point where they are best equipped to make decisions about the product.

## Agile Cross-Functional Teams

A cross-functional setup formed around a defined product is the most effective way of building software development teams. Before getting into team composition details, let's mention three principles. They are an excellent guide to forming this kind of team based on the research of Daniel H. Pink, compiled in his book _[Drive](https://www.danpink.com/books/drive/)_:

*   _Autonomy_. To be effective, a team has to be autonomous. Dependencies are the blight of high-speed delivery. Empowered contributors with ownership over their work are much more likely to be effective than somebody who is just there to execute other's people ideas.
*   _Mastery_. The team needs all the necessary skills to deliver their product. If the team misses some skills, a culture of continuous improvement helps cover the gaps.
*   _Purpose_. Knowing the big picture is crucial to making good decisions. Clear, measurable, team-wide goals prevent unnecessary politics. Additionally, people like to know the context and reasoning behind the goals and the decisions of the organization.

Keep these principles in your mind at all times as they'll guide you toward building teams that require little oversight.

## Team Composition

First of all, teams can't be too big. Fred Brooks wrote about this in _[The Mythical Man-Month](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)_ as early as 1975\. Pairwise interactions grow quadratically with the number of team members to the point where communication degrades. As a rule of thumb, five to eleven people per team is a reasonable number. 

You need all the necessary roles in a team if you want it to be cross-functional. Here are some typical ones:

*   Developer
*   Product owner
*   Business analyst
*   UX
*   QA specialist

This list is not comprehensive because it greatly depends on the mission of the team and the type of work they tackle.

What about more specialized roles? For instance, infrastructure experts, security specialists, or data scientists. A team might not need such people full-time, but some of their skills are surely needed occasionally. In this case, my recommendation is to treat them as advisors. These folks provide advice and enablement so the team can integrate the related cross-functional requirements in their flow. 

Involving external parties is a sensible idea. However, it's important to note that a team shouldn't relinquish the ownership of its product. Having an external security team that tells the team what they can or can't do is a common anti-pattern. While their advice is invaluable, you shouldn't let them be gatekeepers.

## Generalists vs Specialists

Did you notice that I said "developers?" No mention of front end or back end whatsoever. I'm a strong believer in having full-stack engineers on a team. Users don't care about the division anyhow. It's my experience that separating developers strictly across technologies encourages siloing. Ensuring that everybody is working on the most impactful chunk of work is much harder if parts of the product are only known to one of two people, a problem known as the [bus factor](https://en.wikipedia.org/wiki/Bus_factor). 

Some people think the full-stack mindset means every developer has to know everything. That's not the point! It's pretty much impossible anyway. Modern software engineering has so many moving parts that you can't hope to learn them all. People tend to be more familiar with or more interested in certain parts, and that's fine. Aim to be [T-shaped](https://en.wikipedia.org/wiki/T-shaped_skills). 

This is a controversial point in some organizations, so be prepared to make compromises. Don't give up the fight to avoid and break silos.

## Technological Leadership of an Agile Team

How do you handle the role of a technical leader of an autonomous team? Funny you should ask. I recently wrote an [article](https://linearb.io/blog/software-team-lead-responsibilities/) about that. There's much to say about this topic, but I'll limit myself to three points:

*   Leadership isn't restricted to a role. Everybody can and should show leadership on a team. Taking ownership of parts of the delivery is a perfect example of leadership.
*   Having said that, bringing a person to the team to fill a dedicated leadership role is often beneficial. Those skills are different than just having more experience or more tenure.
*   Putting a tech lead on a team doesn't mean abdicating collaborative decision-making. On the contrary, a [good tech lead](https://www.patkua.com/blog/the-definition-of-a-tech-lead/) should enhance that aspect by practicing servant leadership.

## A Set of Rituals

We've talked about principles and team composition. But a team isn't a static entity. A team is defined not only by _what_ it does but _how_ it goes about it as well.

The ways of working on a team are fundamental parts of its identity. I'm sure you know these agile rituals: a daily standup, regular retrospectives or reviews. Those are tools to [sharpen your saw](https://blog.codinghorror.com/sharpening-the-saw/), make you more effective as a team, share information, and broadcast the team's output to the outside.

Agile rituals don't guarantee success. Just because you do a daily in the morning doesn't mean that you're getting anything out of it. Think critically and go past the surface to ensure that collaboration or autonomy aren't just buzzwords in your day to day. While I don't think a team needs an agile coach to practice agile, it may make sense for a less mature team to get support from a specialist until they're ready to roll on their own.

## Measuring the Effectiveness of a Team

If teams have clear, measurable goals, everybody has an easier time deciding how to invest their time effectively with little outside guidance. Objectives and key results ([OKRs](https://www.whatmatters.com/faqs/okr-meaning-definition-example)) are a popular framework to set actionable goals. Honestly, it's not about the framework. It's about the commitment to set goals for a team and evaluating the team and the goals regularly.

I've been part of teams that had completely unreasonable targets set by management without any transparency. If you're trying to demotivate your engineers, that's exactly the way to go.

Be very careful with goals. Ask if they're forcing team members to choose between their and the team's best interests. If that happens, it's a failure, and it's the fault of the people setting up the organizational structure.

## Seek Feedback

To summarize, structuring engineering teams is about continuing the work that you begin when you structure your engineering organization as a whole. My advice is to have _autonomy_, _mastery_, and _purpose_ as your guiding principles. Start from there and iterate constantly.

Do you need inspiration from the community? I like this [deck](https://www.slideshare.net/patkua/building-a-high-performing-team-72975599) from Pat Kua. LinearB's [Dev Interrupted Community](https://linearb.io/dev-interrupted-community/) is a place to share experiences and learn from the successes (and the failures!) of others.

*This post was published initially in [LinearB](https://linearb.io/blog/engineering-team-structure/).*

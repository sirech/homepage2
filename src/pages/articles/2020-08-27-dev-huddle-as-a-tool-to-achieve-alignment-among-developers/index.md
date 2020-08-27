---
title: Dev huddle as a tool to achieve alignment among developers
date: "2020-08-20"
layout: post
path: "/dev-huddle-as-a-tool-to-achieve-alignment-among-developers/"
categories:
  - Agile
  - Practices
  - Leadership
draft: true
description: ""
---

I've been working as a [tech lead](https://www.patkua.com/blog/the-definition-of-a-tech-lead/) in agile teams for the past few years. What's that role, anyways? In Pat Kua's words: 

> A Tech Lead is a software engineer responsible for leading a team and alignment of the technical direction.

Which sounds really sensible, but how do you accomplish that? I get asked that question every now and then. I've realized that it's pretty difficult to answer! I've found myself talking about empowerment, goals, and a whole bunch of stuff that can sound really vaporous.

What are concrete things that you can **actually** do? Every situation is different, every team has its own idiosyncrasies. Universal advice probably doesn't exist. There is, however, one ritual that I've been using in the teams I've been part of that works really well. I want to talk about the idea of the Dev Huddle.

## What is a dev huddle

There are many names: Dev Huddle, Tech Huddle, Dev Meeting. In any case, it's a recurring meeting intended por the developers in a team. It's used to discuss technical topics, to create alignment and to make decisions regarding architecture, conventions, or other aspects of the technology stack inside a team.

Wow! That's _so_ innovative, you might sneer. Yes, it's nothing groundbreaking. The devil is in the details, though. Running one effectively is trickier than it looks. There's nothing that will frustrate a group of developers more than having yet another meeting that they find useless. If you're taking the time of the team, it's got to count for something.

## Why should I have one?

Before talking about the _How_, let's stop at the _Why_ first. Why is this a good idea at all?

- _Alignment_: A team of developers might work closely together (literally. Some companies really think that close collaboration means being so cramped in a room that you can tell what everybody has eaten for lunch from your desk), and yet what they build might look like something built by people that never met. Do you have an agreement on the conventions to use while coding? What's the library you want to use to parse _JSON_? There are many small questions that are not important enough to stop everything and discuss it. Over time they build the core of a cohesive understanding on how to build software that is crucial for any team.
- _Innovation_: You don't want to rewrite your application every six months with the newest trendy technology, but you'll want to experiment, try new things out, and [improve continuously](https://www.creativesafetysupply.com/articles/continuous-improvement/). Gathering ideas and finding a way of TODO: finish
- _Debate_: Some teams like to practice what I call _discussion by seniority_, where the most senior people in the team make the technology decisions, and the rest follow them. If they are lucky to find out about those decisions.

## The structure of a dev huddle

TODO: backlog
TODO: maintenance


### When do we do it?

I've seen people say _we'll just get together whenever we need it, we're agile after all!_. I've never seen it work in practice. There is always something urgent happening, somebody doesn't have time right now.

My advice? Pick a slot. The same slot, every week. Ideally at a time where you're less likely to interrupt. After the daily, just after lunch. Doesn't really matter. People will get used to it and take it into account in their planning.

I think half an hour is enough to have meaningful discusions, without taking too much time. The flow of the board is a good indicator. If you're collecting more and more topics that you'll never talk about, maybe it's time to stay a bit longer. If you're running out of stuff, maybe you can finish early, or even switch to bi-weekly?

## How to run a dev huddle

Running a dev huddle consists of going through the list of topics, discussing them, reaching a conclusion and documenting it. Sounds easy, right?

Not so fast. First of all, there **has** to be a facilitator.

I used to run all the huddles in a previous team. I realized the mistake later. You end up making the meeting yours, when it's something that should ideally belong to the whole team. Besides, it's really hard to facilitate and be an active participant at the same time. Rotate the facilitation instead. People get to practice moderating meetings, and you get to have some of the fun as well!

### Facts over opinions

TODO

## The outcome

### Slack items

TODO

### Technical Stories

TODO

### Keeping track of decisions

So everybody was fired up for the huddle. Topics were discussed, you've got an agreement on whether to use semicolons or not. It's all going so well. Until nobody wrote it down, and you had the exact same discusion next week. I personally get extremely triggered when I discuss the same thing over and over.

Can I interest you in some [lightweight Architecture Decision Records](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records). It can sound formal and un-agile, but it's really not. You just have a place where you keep track of decisions you made. A simple Markdown file with a title, what you decided and an explanation of the why. That's really important. It's really helpful to understand the context of a decision when you're looking back. I've seen people write novels to wax poetic about the virtues of something like Kafka, but something simple works as well.

    Title: Use Kotlin instead of Java for new services
    
    Date: 2018/10
    
    Decision: We'll be using Kotlin whenever we start a new service, but leave the existing ones
    
    Context: We think Kotlin will help us create more lightweight services, while improving quality thanks to null safety
    
There are [many templates out there](https://github.com/joelparkerhenderson/architecture_decision_record#adr-example-templates) that you can use. The important part is to be disciplined and make sure that you don't forget your own decisions.
    
## Conclusion

TODO
    

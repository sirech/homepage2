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

I've been working as a [tech lead](https://www.patkua.com/blog/the-definition-of-a-tech-lead/) of different agile teams for the past few years. What does a TL do, anyways? In Pat Kua's words: 

> A Tech Lead is a software engineer responsible for leading a team and alignment of the technical direction.

It sounds sensible, if unconcrete. How does it look in practice? I get asked that question every now and then. I've realized that it's pretty difficult to answer! I've found myself talking about empowerment, goals, and a whole bunch of stuff that can sound really vaporous.

What are concrete things that you can **actually** implement? Every situation is different, every team has its own idiosyncrasies. There is no universal advice. There is, however, one ritual that I've been using in the teams I've been part of that works really well. I want to talk about the idea of the _dev huddle_.

## Dev huddle?

<figure class="figure figure--right">
  <img src="./images/developers-aligning.jpg" alt="Alignment" />
  <figcaption class="figure__caption">
  Developers aligning expectations
  </figcaption>
</figure>

There are many names: Dev Huddle, Tech Huddle, Dev Meeting. Whatever the name, it's a recurring meeting intended for the developers of a team. It's used to discuss technical topics and to make decisions regarding architecture, conventions, or any other aspects of the technology stack.

Wow, that's _so_ innovative! You might sneer. Yes, it's nothing groundbreaking. The devil is in the details, though. Running one effectively is tricky. There's nothing that will frustrate a group of developers more than having yet another meeting, if they find it useless. If you're taking their time, you better make it count.


## Why should I hold one?

Before focusing on the _How_, let's stop at the _Why_ first. What are the arguments in favor of investing time in this?

- _Alignment_: A team of developers might work closely together (sometimes _too_ literally), and yet build software as if they never met before. Do they agree on the coding conventions? What's the preferred library to parse _JSON_? There are tons of small decisions to make. Over time they form a cohesive understanding of how to build software that is crucial for any performing team.
- _Innovation_: You won't rewrite your application every six months with the newest trendy technology, but you want to encourage experiments. [Continuous improvement](https://www.creativesafetysupply.com/articles/continuous-improvement/) compounds over time. I've been in teams that looked hopeless at some point. After a year of many small improvements, we're doing [continuous deployment](https://www.atlassian.com/continuous-delivery/continuous-deployment#:~:text=Continuous%20Deployment%20(CD)%20is%20a,cycle%20has%20evolved%20over%20time). That will rarely happen in one big push, though.
- _Debate_: Some teams practice what I call _discussion by tenure_, where the most senior people in the team make the technology decisions, and the rest follow them. If they are lucky to find out about those decisions. Your senior folks have the experience and the instincts, but that doesn't mean that you can't encourage everybody to contribute. 

## Preparation

I like to structure huddles around a backlog of ideas. It can be as simple as a piece of paper on the wall and stickies. Or a list of issues in Github. There is no need to overthink it. As long as somebody can present each item, it can be just a headline. Some examples:

- Let's try out [strikt](https://strikt.io/), a new assertions library
- Refactor our API calls to use [React hooks](https://reactjs.org/docs/hooks-intro.html)
- Missing documentation for the newest microservice

In the beginning, you'll likely put most of the items yourself. Over time, more and more of them will hopefully come from other people in the team. That's a good sign that they feel comfortable bringing forth their ideas.

<figure class="figure figure">
  <img src="./images/huddle-board.png" alt="Huddle board" />
</figure>

If you're lucky, you'll have the opposite problem. That is, too many items to discuss. It usually never becomes truly unmanageable. I tend to order them by creation date. It's good to try to mix them a bit by creator, so that everybody gets a chance to present your ideas.

In one project, we had three slots for topics. This could be filled by anybody during the week, first come first serve. Those would be the ones discussed first. If there was time remaining, we'd pick other items from the backlog and talk about them.

### Finding a time

Some will say: _Let's just get together whenever needed. We are agile!_. That doesn't work in practice, in my experience. There is always something urgent. Somebody doesn't have time right now.

My advice? Pick a fixed slot. Same day and hour, every week. Ideally at a time where you're less likely to interrupt. After the daily, just after lunch. Doesn't really matter. People will get used to it and take it into account in their schedule.

Half an hour should be enough to have meaningful discussions. The flow of the board is a good indicator. If you're collecting more and more topics that you'll never talk about, maybe it's time to stay a bit longer. If you're running out of stuff, maybe you can finish early, or even switch to bi-weekly?

## How to run a dev huddle

Running a dev huddle consists of going through the list of topics, discussing them, reaching a conclusion and documenting it. Sounds easy, right?

<figure class="figure figure--right">
  <img src="./images/moderator.jpg" alt="Moderator" />
  <figcaption class="figure__caption">
  Moderation happening
  </figcaption>
</figure>

Not so fast. First of all, there **has** to be a facilitator. Keeping the total time, but also making sure that no single topic consumes the whole meeting. Ensuring that everybody has a chance to speak. Without this role, you might end up having a pub discussion.

I used to run all the huddles in a previous team. I realized later what a mistake it was. The meeting becomes yours, when it should belong to the whole team. Besides, it's really hard to facilitate and be an active participant at the same time. Rotate the facilitation instead. Everybody gets practice moderating, and you get to have some of the fun as well!

And then ... _discussion_. A huddle won't fix a broken culture, but it's a good litmus test. Are discussions based on opinions, or on facts? Are you fighting to get a word in? If so, this is the least of your problems.

## The outcome

Getting the team to talk to each other is already _something_. If there is no outcome, though, it's not really a meeting but a social gathering. So let's write down our findings. 

### Technical Stories / Slack items

Don't listen to the [pointy haired micromanagers](https://en.wikipedia.org/wiki/Pointy-haired_Boss) that want to record every action ever taken in a ticket. For small stuff, keep the accounting to a minimum and rely on [slack time](https://www.solutionsiq.com/resource/blog-post/the-importance-of-slack-in-achieving-speed-and-quality/).

For bigger things, write technical stories and make sure to integrate them in your regular backlog. There is a lot that can be said [about the topic](https://www.thoughtworks.com/insights/blog/treat-devops-stories-user-stories).

### Keeping track of decisions

<figure class="figure figure--left">
  <img src="./images/decision-records.jpg" alt="Decision records" />
  <figcaption class="figure__caption">
  Keeping track
  </figcaption>
</figure>

Everybody was fired up for the huddle. It got intense, but you've reached an agreement on whether to use semicolons or not. _Shit is getting done_. Until nobody wrote it down, and you had the exact same discussion next week. I personally get extremely triggered when I repeat the same meeting over and over.

Can I interest you in some [lightweight Architecture Decision Records](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records)? It can sound formal and un-agile, but it's really not. You just have a place where you keep track of decisions you made. A simple Markdown file with a title, what you decided, and an explanation of the context. I've seen people write novels to wax poetic about the virtues of Kafka, when something simple works just as well.

    Title: Use Kotlin instead of Java for new services
    
    Date: 2018/10
    
    Decision: We'll be using Kotlin whenever we start a new service, but leave the existing ones
    
    Context: We think Kotlin will help us create more lightweight services, while improving quality thanks to null safety
    
There are [many templates out there](https://github.com/joelparkerhenderson/architecture_decision_record#adr-example-templates) that you can use. The important part is to be disciplined and reflect what you agree upon. 
    
## Get huddling!

Looking back, all the teams I've been on have benefited from having a place for developers to align. It's a fairly small investment of effort and time. Go ahead and give it a try, and find the setup that works best for you.
    

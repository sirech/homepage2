---
title: Technical stories, a miscast artifact of agile development
date: ""
layout: post
path: "/technical-stories-a-miscast-artifact-of-agile-development/"
categories:
  - Agile
  - Practices
  - Leadership
draft: true
description: "Technical stories are misused. If used correctly, they help shape the technical vision. If not, they just enable skipping essential work"
image: ./images/tech-story.jpg
---

<figure class="figure figure--left">
  <img src="./images/tech-story.jpg" alt="Technical Story" />
</figure>

_Technical stories_ are a controversial topic in the agile world. If you google [technical stories antipattern](https://www.google.com/search?q=technical+stories+antipattern), you'll get plenty of people advocating never to do them. On the other hand, some teams religiously outsource any refactoring onto technical stories.

Should we eschew technical stories altogether? Or should we embrace them and put all of our (technological) dreams and hopes into them?

I believe this kind of story belongs in a healthy backlog, as long as we don't use it to hide our corpses under the rug. That's a terrible idea. I'll explain what I mean in this article.

### What is a technical story, anyways?

I'm not sure there is an agreement on this. I couldn't find a definition on the internet, so I'll use my own.

> A technical story is one where the main stakeholders are the developers in the team.

The end-user benefits only indirectly from such a story. As our system becomes better, the theory goes, we'll have an easier time delivering actual user stories. I've seen attempts at putting a monetary value on technical stories, but it felt nothing more than a charade.

## Are technical stories an antipattern?

Back to the original question. To answer it, let's picture a user story as an iceberg.

<figure class="figure figure--right">
  <img src="./images/iceberg.jpg" alt="Iceberg" />
  <figcaption class="figure__caption">
  How hard could it be?
  </figcaption>
</figure>

The visible part for external stakeholders is above water. For them, that's the feature, and they probably don't care much about what happens underwater. Yet, the complexity hides below. Most of the effort will be spent there.

The problem with technical stories is that they are used to draw an artificial line. We do the simple, visible part. And we extract the rest into a technical story. We don't even need to play it right now. What an improvement in our velocity!

<figure class="figure">
  <img src="./images/iceberg-reality.png" alt="The reality of the iceberg" />
</figure>

Except, this is a **crucial mistake**. We're avoiding essential technical work in a misguided effort to be faster. Striping a _user story_ of this bottom part **is** the antipattern. It leads to an endless list of tickes in the backlog that will never happen. It encourages cutting corners and short-term thinking. If the story is too big, let's find one with a smaller scope that still delivers meaningful value. But we have to resist by all means the temptation of crippling our stories to meet an arbitrary story point cut off.

<figure class="figure figure--left">
  <img src="./images/conflict.jpg" alt="Conflict" />
  <figcaption class="figure__caption">
  PO and Dev align expectations
  </figcaption>
</figure>
    
Besides, it creates unnecessary tension between the business side and the technology side. Developers often feel like they have to fight for long-overdue improvements. The product owner can't understand why stories take twice as long as before.

Sure, taking on some [tech debt](https://martinfowler.com/bliki/TechnicalDebt.html) can be a valid tactical decision. But let's be honest, we're just normalizing the practice of writing substandard software if we keep doing this.

## Then when do **you** create technical stories?

I thought you'd never ask. In my opinion, the most natural place to create technical stories is the [dev huddle](../dev-huddle-as-a-tool-to-achieve-alignment-among-developers/). As a result of a successful dev huddle, the development team will agree on certain experiments, refactorings, or changes to be made. Those are all technical in nature. Any action big enough is a prime candidate for a technical story. To name some examples:

- Let's try out [strikt](https://strikt.io/), a new assertions library
- Refactor our API calls to use [React hooks](https://reactjs.org/docs/hooks-intro.html)
- Missing documentation for our newest microservice

Once there is an agreement in the team, reflecting these points in stories helps build the team's technical vision. These stories will (hopefully) happen soon, and increase the quality of the system. That, in turn, means that the iceberg's visible part will have an easier time floating, which will lead to more fancy features for our happy stakeholders.

### Monitor the amount of technical stories in your backlog!

The number of technical stories is a useful [fitness function](https://www.thoughtworks.com/radar/techniques/architectural-fitness-function). If that number only grows and grows, this whole process is not working well. If anything, it can even discourage further attempts to improve the situation.

## The tenets of a good technical story

Let's say you grudgingly agree to start writing technical stories (only when it makes sense!). How do you do it? This is the kind of story that will likely be written by a developer. And, to be fair, many of them lack experience.

<figure class="figure figure--right">
  <img src="./images/story.jpg" alt="Story writing" />
  <figcaption class="figure__caption">
  Like everything else, good writing takes practice
  </figcaption>
</figure>

Poorly written technical stories are sadly all-too-common. They are dense. They don't get to the point. They are vague on the provided value. Because of this, they languish in the backlog. That leads to important topics not being addressed. This cycle is hard to escape from.

**A technical story has to be held to the same standards as a user story**. A story with a one-line description like _Upgrade Rails to a new version_ doesn't cut it. It's unfair to demand that user stories are descriptive, complete, and clear if that won't apply to the technical ones.

There are many resources on [how to write user stories in general](https://www.mountaingoatsoftware.com/books/user-stories-applied). There is even an acronym, [INVEST](https://www.agilealliance.org/glossary/invest). Follow these practices while using your best judgment. Here is a suggested structure based on my last five years of story poetry.

    - Context
    - What's the value
    - What to do (Acceptance Criteria)
    - Tech hint

### Context

Where does this story come from? Understanding the background prevents misunderstandings. If we don't even start from the same place, we might go in wildly different directions.

### What's the value

Technical stories are in a perpetual fight for survival. Stories without clear value get ignored in favor of user stories that bring a tangible benefit. That's why it's important to consider it. Getting hard numbers is ideal, although not always possible. A qualitative judgment of what we want to improve can be helpful enough.

### What to do (Acceptance Criteria)

Yes, this seems pretty self-evident. Still, you'll find stories that aren't actionable like _Fix the performance of the form rendering_. Is it clear what we want to do? How will we know when we're finished?

### Tech hint

Help your teammates by giving them some guidance. If it's about upgrading _React_, what pitfalls are already known? Usually, there was a prior investigation, which is invaluable information that we don't want to rediscover. 

Be mindful, however, of writing an instruction list. Nobody wants to be ordered around. Moreover, writing down a very detailed list of steps can be as much effort as doing the story in the first place.

<figure class="figure">
  <img src="./images/blueprint.jpg" alt="Blueprint" />
  <figcaption class="figure__caption">
  An exact blueprint will prevent so many needless discussions
  </figcaption>
</figure>

## Technical stories are another tool in the belt

Technical stories have helped the teams I've been on managing evolution and improving. The two fundamental points that I want to highlight again are:

- _Don't_ strip the underlying complexity of a story and put it in technical stories that you "will just do later."
- _Do_ yourself a favor and treat technical stories with the same respect and care as you do for user stories.

Notice that I haven't talked about the tension between including user stories and technical stories in an iteration. That relates to building a technical backlog and assessing the health of a system. I plan to dig into that on its own post.



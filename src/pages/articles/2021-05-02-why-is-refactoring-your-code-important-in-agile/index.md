---
title: Why Is Refactoring Your Code Important in Agile?
date: "2021-05-02"
layout: post
path: "/why-is-refactoring-your-code-important-in-agile/"
categories:
  - Practices
  - Software Engineering
  - Agile
  - Refactoring
related:
  - /book-review-working-effectively-with-legacy-code/
  - /what-is-code-duplication-definition-and-overview/
  - /technical-stories-a-miscast-artifact-of-agile-development/
draft: false
description: "Learn why refactoring your code is important. Foster experimentation and lightweight solutions, not excessive planning and fear of change."
image: ./images/cover.jpeg 
canonical: https://www.coscreen.co/blog/refactoring-your-code-in-agile/
---

<figure class="figure figure--left">
  <img src="./images/cover.jpeg" alt="Refactoring" />
</figure>

Refactoring is a powerful tool that is an integral part of every developer's repertoire. It's especially important if you work in an agile environment.

Refactoring helps keep the code nimble and maintainable as you constantly iterate and pivot.

In this post, I'm going to provide you with an overview of code refactoring, how it works, and its benefits.

## What Is Refactoring?

For a proper definition, I'm quoting [Martin Fowler's _Refactoring_](https://martinfowler.com/books/refactoring.html):

> Refactoring (noun): a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.

You refactor to improve the internal structure of the code without changing any functionality. From the outside, there isn't any noticeable difference before and after the refactoring. "If nothing changes, why do it at all?" your stakeholders might ask you. Let's give them an answer.

## 3 Reasons Why Refactoring Is Important

Now that we understand what refactoring is, let's take a look at why we should refactor code in an agile environment.

### 1\. Refactoring Makes Your Code Easier to Modify

Simply put, you refactor to improve the design of your software. Any application under active development is a moving target. As you add new functionality, cohesion decreases. Abstractions aren't as clean anymore. By refactoring regularly, you update the code so that it reflects an improved understanding of the domain. This alignment enables easier modification.

### 2\. Refactoring Makes Your Code Easier to Understand

Thanks to an improved design, you also make the code easier to understand. It's a well-known fact that developers [read code much more often than they write it](https://devblogs.microsoft.com/oldnewthing/20070406-00/?p=27343). Thus, it's in your best interest to keep it as understandable as possible, which greatly increases maintainability. People going over it in the future will thank you.

### 3\. Refactoring Is Sharing Knowledge

Finally, refactoring is a way of sharing knowledge. After refactoring a piece of code, you gain a deeper understanding of what it does, even if you didn't originally write it. Spreading knowledge is crucial when you're [working as a team](https://www.coscreen.co/blog/even-10x-engineers-work-best-in-a-team/).

## The Role of Refactoring in Agile Development

The usefulness of refactoring is more apparent in an agile environment. When you do agile, you work in short iterations, continuously releasing small chunks of functionality that bring value. Fast feedback is paramount for a quick loop. Under these circumstances, it won't be possible to design the whole system in advance. Many organizations spend a lot of time trying to plan everything upfront only to realize later on that their assumptions were wrong. Instead, you need to embrace change and build [an evolutionary architecture](https://www.thoughtworks.com/evolutionary-architecture) that you constantly improve. Refactoring is a key part of the process as you align the code with the architecture, keeping both in sync.

## The Cadence of Refactoring

Many teams struggle to integrate the refactoring step into their workflow. I strongly believe that refactoring is part of working on any user story. Don't split it into a technical story that you'll schedule later on, if ever. For me, implementing a story includes leaving the code in a better state than before ([the boy scout rule](https://wiki.c2.com/?BoyScoutRule) from [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin)). Whatever you do, don't build an arbitrary distinction between business value (building the feature) and technical value (keeping the code accessible). Does this mean that you have to stop and refactor every bit of code that you write? No! Let's be pragmatic. Maybe the first time you go over it, you won't have enough context to improve it. If you touch it a second or a third time, then consider how to improve it. In the end, this is a balancing act. You want to continuously do small refactorings that never stop the delivery rhythm of the team.

## The Anatomy of a Refactoring

Performing a refactoring is a bit like a kata. Each refactoring has a goal, centered around fixing a [code smell](https://martinfowler.com/bliki/CodeSmell.html). You implement it through a list of small steps. You run them in order, and the end result is improved code. Typical goals include organizing data, handling generalization, or simplifying method calls. As a reference, Fowler's book _Refactoring_ consists of a catalog of many different refactorings. Depending on your situation, you pick the one that suits best in that scenario. And then you repeat the process. There are many tools in the market that support you in this cycle. For example, in the Java ecosystem, the IntelliJ IDEA IDE supports automating many refactorings. This might be a bit too high level. Maybe an example will make it clearer.

### A Sample Refactoring

Let's have a look at a classic: [Extract Method](https://refactoring.guru/extract-method). In this refactoring, the goal is to group a code fragment in a separate method, making the original method smaller and easier to read. Essentially, this is the recipe:

*   Create a new method named after its intention.
*   Copy the extracted code from the source into the new method.
*   Call the new method from the source, passing the necessary variables.
*   Ensure the code works as before.

Let's assume you have this block of code:

```kotlin
fun splitNumbers(source: String): List<Int> {
    val split = source.split(",")

    // convert each string to a number
    val numbers = split.map { str ->
        str.toInt()
    }

    return numbers
}
```

I'm going to extract part of it into a new method, bit by bit. In the interest of space, I'll skip the intermediate steps and show you the result:

```kotlin
fun splitNumbers(source: String): List<Int> {
    val split = source.split(",")
    return convertStringToNumber(split)
}

fun convertStringToNumber(list: List<String>): List<Int> {
    return list.map { str ->
        str.toInt()
    }
}
```

If you check the initial code, you'll notice that the method is doing two things at once, which makes the code more confusing. The comment is a smell that the responsibilities are not cleanly separated. So, I've extracted that into its own method, called **convertStringToNumber**. I'm passing the unprocessed list from the main method as an argument. Finally, the intermediate variable **numbers** is no longer needed. Instead, I'm inlining the auxiliary method call, as the **splitNumbers** method's intention is clear now. Simple, isn't it? I've made the code easier to maintain with little effort. Notice how I replaced a comment that'll likely go out of sync with a meaningful method name that describes the block's purpose instead.

## Refactoring Best Practices

There are certain things to keep in mind when you're refactoring code if you want to extract all the value from this practice:

*   Only refactor code that has tests. Refactoring code without tests is, frankly, gambling. There's no way to be sure that you didn't break the code if you don't have tests that confirm that the before and after are equivalent. No matter how disciplined you are, you'll introduce bugs sooner or later.
*   Use incremental steps. Change a bit of code, then check if everything works. Then, commit before continuing. Always be on the lookout for [yak shaving](https://www.hanselman.com/blog/yak-shaving-defined-ill-get-that-done-as-soon-as-i-shave-this-yak).
*   Keep refactorings small. The bigger a change, the riskier it is. Split it into multiple smaller chunks. You mitigate risks, and you get flexibility.
*   Remember the rules. Don't start adding functionality in the middle of a refactoring. A refactoring doesn't change the output of the system. Finish it first, then continue with the next task.
*   Avoid the [sunk cost fallacy](https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/sunk-cost-fallacy/). If you go down a route that leads you nowhere, abandon the whole thing. Given that you are working in small steps, you won't lose much.

Refactoring is all about constant practice and discipline. If you do it often, it'll become second nature to you.

## What If I Still Don't Want to Refactor My Code?

Let's be honest. If you still don't want to refactor your code, you'll be the one who gets harmed the most. If you only add code without improving its internal structure, you'll hit a wall. At some point, it'll take you a ridiculous amount of effort to add a minor feature. Your stakeholders won't be happy, and appeasing them by talking about [tech debt](https://en.wikipedia.org/wiki/Technical_debt) won't do you any good. Should you ask them for permission to work on these refactorings? I don't think so. You, as a developer, are the expert here. If you're concerned, make sure to follow the steps above. If you're delivering a steady stream of value, I'm sure that they won't have a problem with you investing in the health of the codebase.

## Don't Fly Solo

Refactoring is an activity that benefits greatly from collaboration. If you do any amount of [pair programming](https://www.coscreen.co/blog/love-or-hate-pair-programming-here-to-stay/), you'll likely work on areas that either your pair or you don't fully understand. Refactoring this code together is a great way to gain a shared understanding, transfer knowledge, and develop a codebase that looks like it was written by a single person. Collaboration doesn't stop just because you're not in the office with your teammates anymore. Distributed teams working remotely have the same need for effective teamwork. If you're interested in learning more about remote agile, check out this guide: [Distributed Agile Teams: A [N] Step Guide to Success.](https://www.coscreen.co/blog)

## Refactoring Is Essential to Agile

Refactoring consists of changing the internal structure of the code in a way that doesn't modify its behavior. This makes the code more maintainable and easier to understand. It enables the developers in the team to keep complexity under control. In my opinion, you can't do agile without a healthy culture of refactoring. You want to encourage experimentation and lightweight solutions, not excessive planning and fear of change. For that, you need to improve the code continuously through small modifications. If you don't tend your garden, it'll decay over time until every feature takes forever to build. You'll be left wondering how it ended up like this.

*This post was published initially in [CoScreen](https://www.coscreen.co/blog/refactoring-your-code-in-agile/).*

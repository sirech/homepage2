---
title: "The Humble Extract Method"
date: "2023-02-19"
layout: post
path: "/the-humble-extract-method/"
description: "The extract method refactoring is a low-cost high-impact tool to increase maintainability in your code. Lets talk about its benefits"
categories:
  - Practices
  - Software Engineering
  - Refactoring
draft: false
related:
  - /book-review-working-effectively-with-legacy-code/
  - /what-is-code-duplication-definition-and-overview/
  - /why-is-refactoring-your-code-important-in-agile/
---

After reviewing a lot of code in the past couple of months, I've realized that I regularly leave comments like this one:

> Can we break down this down into smaller pieces?

Turns out, I like to advocate for shorter methods. Is this the right thing to pay attention to? I think so. I strongly believe that breaking down code is often the most cost-effective way to increase maintainability.

For that, the best alternative is _extracting smaller methods_. It's easy and works consistently. In this article I'm writing about the simple yet powerful extract method refactoring.

## What Is Extract Method, Exactly?

Extract method is [a refactoring](https://refactoring.com/catalog/extractFunction.html) where you move a code fragment to a separate function with a name that describes its purpose. Consider this snippet:

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

Yes, I know this method is already small enough. Bear with me for the sake of the example. Anyway, there's a section that converts a string to a number. It's a prime candidate to extract into its own method:

```kotlin
fun splitNumbers(source: String): List<Int> {
    val split = source.split(",")
    
    val numbers = convertStringToNumber(split)
    return numbers
}

fun convertStringToNumber(list: List<String>): List<Int> {
    return list.map { str ->
        str.toInt()
    }
}
```

There it is! We now have a proper submethod instead of an inline comment. For a more realistic example, imagine this was a hundred lines long instead of five. Good thing is, the approach would work the exact same way. Moreover, you can apply this technique recursively and break down the new methods further.

All in all, this refactoring is pretty straightforward, isn't it? In fact, it's been supported by IDEs like [IntelliJ](https://www.jetbrains.com/help/idea/extract-method.html) since basically forever. And yet! Despite its simplicity, this humble change brings quite a lot of value. Let's talk about its benefits.

## Shorter Methods Improve Readability

The most obvious outcome of using _Extract Method_ is that it makes methods **short**. Is that a good thing, though?

Yes! Let me argue why. Shortening methods is necessary to get them to do one thing only (also known as the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)). Methods that do one thing are generally less complex. They require less knowledge about the surrounding context.

When you're navigating a big codebase, you can't keep every detail in your head. If you have short, single purpose methods you can tune out some of the complexity and focus on one part at a time. That, in my mind, leads to a massive readability boost.

One argument I've heard against extracting methods is that it's easier to understand code if it's all in the same place. I find that argument unsatisfying. It might work, as long as you're deeply familiar with the implementation already. In that case, you can implicitly zoom in and out as needed. Otherwise you're going to struggle.

You can still navigate the codebase, but you will get little support from it. It's so much easier to do if you can rely on abstracted methods that hide implementation details. Note that this only holds true if the abstractions are _good_. If the division doesn't make any sense you'll no doubt be worse off.

How short is short enough? That's a matter of debate and preference. Hear [Uncle Bob](https://www.oreilly.com/library/view/clean-code-a/9780136083238/) for some guidance:

> My rule is “extract till you drop”.  A function is too big if I can meaningfully extract another function from it.

## Extracting Methods is an Opportunity for Good Naming

Naming is hard. And yet, without good names extracting methods isn't worth it. Even if the abstraction is good, a bad name makes it unaccessible. Thus, good naming is crucial for readability. 

A name that describes the method's purpose serves as lightweight documentation. Documentation that's supported by the language, unlike comments. Automated tooling can find and change methods in a way that's usually impossible to do in ad-hoc comments.

If you're struggling to find a name for an extracted method, it can be a sign of two things:

- An unclear boundary, and thus a fuzzy responsibility. That makes it hard to find a proper name
- The method is still too big and needs to be split further

## Wait, There Are More Benefits

The combination of smaller methods and better names reduces cognitive load. Each method serves as a small reusable abstraction. Like using `map` instead of iterating over a list:

```kotlin
    val input = listOf(1..10)
    
    val result = mutableListOf<String>()
    for(item in input) {
        result.add(item.toString())
    }
    
    val sameResult = input.map { it.toString() }
```

Using `map` hides details that you won't need most of the time, and allows you to think at a higher level of abstraction.

Anyhow. While shorter methods and better names are the big two, there are some more arguments in favor of extracting methods

### Nesting Is Another form of Complexity

Excessive length isn't the only way complexity creeps in. Code that's nested multiple layers deep is as hard to read. It can hide bugs as you inadvertently put things in the wrong scope.

Luckily, extracting methods reduces nesting the same way that it reduces length.

### Small Methods Reduce Coupling

Dependencies make it harder to reason about code. They make it harder to change as well.

Suppose you have a massive method. There are plenty of local variables capturing intermediate results. While they provide an opportunity for meaningful names, they lack the encapsulation that methods provide. You have access to everything that happened before in the method, which can entangle the logic beyond salvation.

Not only that, it means that you can't be sure of what it contains unless you painstakingly go through the whole logic. Doubly so in languages that don't allow read-only variables.

### What About Testability?

And lastly, we come to testability. Does extracting methods improve testability? You could argue it doesn't, as you should have your tests ready _before_ you perform the refactoring.

However! Reality isn't always so kind. You might face a huge, gnarly class that lacks tests. Writing tests might prove impossible unless you make the problem more manageable.

As described in the book [Working Effectively with Legacy Code](../book-review-working-effectively-with-legacy-code/), extracting methods allows you to break down smaller pieces. At some point they get small enough that you can write some tests for them. It's not going to be pretty, but iit gets the job done. Much better than the alternative.

## Notice I Didn't Talk about Reuse

I haven't mention reusability throughout the article. It is, in fact, not the primary goal of _Extract Method_. 

A smaller auxiliary method is valuable even if we only use it once. Making code more readable is already a significant benefit. If that method turns out to encapsulate a reusable abstraction, that's a welcome benefit. But it's not something to force or expect.

## Is Extracting Methods Worth The Effort?

In any big codebase, the code developers write lives for a long time. Often, it's still there while the original writers moved somewhere else. Meanwhile, new developers will read it many times and try to figure out what it does. Capturing the context of why a decision happened is hard, so these poor developers are left without context.

Thus, it will be read many times by multiple developers. Investing some effort in making it more readable pays off more and more over time.

Not that you should overdo it, though. An endless collection of one liners isn't an improvement, either. Aim for methods that stand on their own and have one purpose. That's a good guideline to follow.

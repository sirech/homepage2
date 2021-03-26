---
title: "Kotlin tapas: Get a taste of Kotlin"
date: "2019-10-27"
layout: post
path: "/kotlin-tapas-a-taste-of-kotlin/"
categories:
  - Kotlin
  - Tapas
  - Testing
related:
  - /kotlin-either-types-instead-of-exceptions/
  - /painless-json-with-kotlin-and-jackson/
  - /book-review-kotlin-in-action/
draft: false
description: "A bunch of bite sized tapas to get a first taste of Kotlin"
---

I recently did a workshop internally. It was intended to be an introduction about [Kotlin](https://kotlinlang.org). Given that I had limited time, I was wondering which format to use. I wanted to showcase a bunch of the features that _Kotlin_ brings to the table.

Then I remembered [RubyTapas](https://www.rubytapas.com/) from my earlier days as a _Ruby_ dev. That sounds like a good start! Who doesn't like tapas? I did not quite remember how they were actually presented, though. My interpretation is to have small snippets of code. Each snippet illustrates a particular feature of the language. And thus [Kotlintapas](https://github.com/sirech/kotlintapas) was born.

<!--more-->

## What are you babbling about?

Let's assume you have an audience of people who are maybe already familiar with _Java_, but not with _Kotlin_. While code samples are nice, it's cooler to have something concrete to play with. We have the following elements.

- A snippet of _Kotlin_ code 
- A test for that snippet
- A problem to fix: Either refactor the code to make it more idiomatic, or implement missing functionality, making the test green in the process
- A link to the appropriate documentation

My goal is to allow everybody to play with the language a bit, and fix the problem and see the tests working for confirmation. Knowing how chaotic workshops can get, I wanted to avoid build a complex application that requires you to follow along without getting lost.

## A sample tapa

Let's check one of them. We have this this tapa about [Data classes](https://kotlinlang.org/docs/reference/data-classes.html), with the following starting code:

```kotlin
package com.hceris.kotlintapas.dataclasses

class DataClass(val a: String, val b: Int)
```

the test looks like this

```kotlin
package com.hceris.kotlintapas.dataclasses

import org.junit.jupiter.api.Test
import strikt.api.expectThat
import strikt.assertions.isEqualTo

internal class DataClassTest {
    val one = DataClass("The number is ", 42)

    @Test
    fun `sensible equals`() {
        val two = DataClass("The number is ", 42)
        expectThat(one)
            .isEqualTo(two)
    }

    @Test
    fun `making a copy`() {
        val copy = DataClass(one.a, one.b)
        expectThat(one)
            .isEqualTo(copy)
    }
}
```

the exercise is to do the following:


```
## Problem

- The test is failing because the instances are not actually equal. How to fix it?
- We want to make a copy of our class, but we are introducing a lot of duplication. What can be done about it?
```

which in this case is as easy as using `data class` instead of `class`.


## There is more!

This is a pretty simple example, but there are [plenty more](https://github.com/sirech/kotlintapas#list-of-exercises), some of them a lot more complex. I've tried to cover as many different aspects of _Kotlin_ as possible, but still there is plenty left.

As I mentioned, we ran this workshop internally, with around 15 or 16 working in pairs. We had three people acting as coaches, running around offering help. We only managed to go through about five tapas in one hour, and it actually felt a bit rushed. So there is plenty of material there, specially for people new to the language.

Check [the whole thing](https://github.com/sirech/kotlintapas) if you are intrigued and want to use it yourself. They are free!


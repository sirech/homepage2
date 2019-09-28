---
title: Descriptive assertions in Kotlin for clearer tests
date: "2019-09-28"
layout: post
path: "/descriptive-assertions-in-kotlin/"
categories:
  - Kotlin
  - Testing
  - Strikt
draft: false
description: "Readable assertions will make your Kotlin code a lot more self describing and your tests more maintainable"
---

I've written already about [mocks in Kotlin](../mock-verification-in-kotlin/). In that post, I was using [Atrium](https://github.com/robstoll/atrium) to write my assertions. Since then I gave [Strikt](https://github.com/robfletcher/strikt) a try, which is another cool little library. Meanwhile I was using [AssertJ](https://joel-costigliola.github.io/assertj/) at work, so I've had the opportunity to experiment quite a bit lately!

There are two little tricks (*KotlinTapas*, if you will) that I find worth sharing:

- Assertions for data classes
- Custom assertions

<!--more-->

## Assertions for [data classes](https://kotlinlang.org/docs/reference/data-classes.html)

Our functions receive and return _data classes_. That means that our tests will often expect as a result a particular instance of one such class. For the assertions, we started by using `isEqualTo` to compare the whole instance.

```kotlin
expectThat(SecurityContextHolder.getContext().authentication)
        .isNotNull()
        .isEqualTo(token)
```

this approach becomes a problem as your classes gain in complexity. Maybe they contain other entities, or there are lists or maps involved. Generating a proper instance to make `isEqualTo` happy ends up being a lot of work. 

Instead, we want to check just some of the properties. I prefer to avoid multiple assertions in one test, but in this case I see it as unavoidable. This is the solution I use for _AssertJ_, followed by the one for _Strikt_

```kotlin
// AssertJ
SoftAssertions.assertSoftly {
    it.assertThat(token.name).isEqualTo("google-oauth2|3234123")
    it.assertThat(token.authorities.map { it.authority }).contains("create:recipes")
}

// Strikt
expectThat(token) {
    get { name }.isEqualTo("google-oauth2|3234123")
    get { authorities.map { it.authority } }.contains("create:recipes")
}
```

I really like the compactness of the _Strikt_ solution. To be fair, we could compress the _AssertJ_ one with `apply`. But I much prefer the second one.

What about the error message? A drawback of having different assertions is that you get an error message lacking in context:

```shell
Expecting:
 <"EN">
to be equal to:
 <"DE">
but was not.
```

Who can make sense of that without looking at the test in detail? Luckily, our solution offers a much more meaningful message:

```shell
org.opentest4j.AssertionFailedError: ▼ Expect that Some(TokenAuthentication@52789c41: Authenticated: true; Details: null; Granted Authorities: profile, create:recipes):
  ▼ TokenAuthentication@52789c41: Authenticated: true; Details: null; Granted Authorities: profile, create:recipes:
    ▼ name:
      ✗ is equal to "google-oauth2|3234123" : found "google-oauth2|dude"
```

Much better, isn't it?

## Custom assertions

A way of making assertions *say* more is to expand them according to our needs. For example, I have been playing with [Arrow](https://arrow-kt.io/) a lot lately (which on its own can be an endless source of blog posts I believe). I am getting away from using exceptions as much as I can, instead using the [Either datatype](https://arrow-kt.io/docs/arrow/core/either/). Or *Monad*, it's not like I really know what I'm talking about.

In any case, I have a repository with a function that I want to test.

```kotlin
fun find(id: Int): Either<Int, RecipeDetails>
```

I'm calling the method, and want to assert that I got a valid return (`Either.Right`). Then I want to check some of the properties of the output:


```kotlin
val recipe = repository.find(id)
expectThat(recipe)
        .isA<Either.Right<RecipeDetails>>().get { b } and {
    get { name }
            .isEqualTo("carbonara")
    get { ingredients.toList() }
            .hasSize(3)
    get { steps.toList() }
            .hasSize(3)
}
```

this code is a bit unsatisfying. I have to check if the value is a `Right` value, convert it, and then get the actual content before I can start asserting. Luckily for us, _Strikt_ allows you to write [custom assertions](https://strikt.io/wiki/custom-assertions/) that are perfect for a case like this. After hitting my head against the typing for a while, I arrived at this helper:

```kotlin
private inline fun <reified T, reified U> Assertion.Builder<Either<U, T>>.isRight() =
        isA<Either.Right<T>>()
                .get { b }
```

which I use then like this:

```kotlin
val recipe = repository.find(id)
expectThat(recipe)
        .isRight() and {
    get { name }
            .isEqualTo("carbonara")
    get { ingredients.toList() }
            .hasSize(3)
    get { steps.toList() }
            .hasSize(3)
}
```

not a huge change. However, it increases the readability of that little snippet and makes the intentions behind it clearer. I like code with good intentions.

The same can be done for the [Option datatype](https://arrow-kt.io/docs/arrow/core/option/):

```kotlin
inline fun <reified T> Assertion.Builder<Option<T>>.isSome() =
        isA<Some<T>>()
                .get { t }

inline fun <reified T> Assertion.Builder<Option<T>>.isEmpty() =
        isA<None>()
```

## Why, though?

What did we accomplish? Two things, in my mind:

- Tests will tell a better story of what is being tested and why.
- When they fail, it will be easier to figure out the reason.

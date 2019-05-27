---
title: Mock verification in Kotlin using MockK and Atrium
date: "2019-05-27"
layout: post
path: "/mock-verification-in-kotlin/"
categories:
  - Kotlin
  - Testing
  - MockK
  - SpringBoot
  - Atrium
draft: false
description: "When working with Kotlin you might need to build some non trivial mocks that need to be verified. Here is how to do it by combining MockK and Atrium"
---

I have been working with [Kotlin](https://kotlinlang.org/) a lot lately. It is a really awesome language. Elegant, powerful and succint, it fixes most of the annoyances that I had with _Java_, yet it keeps a certain amount of familiarity that allows the transition from it to be very manageable.

Anyhow, I found myself recently having to build a filter in [SpringBoot](https://spring.io/) that I wanted to test. For that I needed to use both a mock and verify that behavior at the same time. _Kotlin_ is evolving quite fast and there are plenty of alternatives to choose from. I will show how to do this with two excellent libraries, [MockK](https://mockk.io/), and [Atrium](https://docs.atriumlib.org/).

<!--more-->

# MockK and Atrium, a powerful combo

In the short time that I have been developing _Kotlin_, I've noticed a pattern. Whenever you need something not provided in the standard library, you tend to start by using the existing _Java_ library that you are familiar with. Then, at some point, you figure out there is a native _Kotlin_ library that leverages the features from the language better.

[MockK](https://www.thoughtworks.com/radar/languages-and-frameworks/mockk) seems to be on its way to become the defacto mocking library for _Kotlin_ apps. With a syntax based heavily around lambdas, it just looks like a DSL, as you can see in this example taken directly from their page:

```kotlin
val car = mockk<Car>()

every { car.drive(Direction.NORTH) } returns Outcome.OK
car.drive(Direction.NORTH) // returns OK

verify { car.drive(Direction.NORTH) }
```

Meanwhile, _Atrium_ is less established, but after getting the recommendation from a colleague, I gave it a try. It uses `expect`, so for somebody like me who is used to _RSpec_ it is already a win. Anyhow, the syntax takes some time to get used to, but it can be quite expressive. I particularly like combining it with data classes to have exactly one assertion per test instead of many.

# The problem at hand

What I was trying to build was not particularly complex. I wanted to write a filter for a _SpringBoot_ application that would inject some headers into the request based on some logic. All controllers would use these values transparently, without having to care about the computation. The filter looks like this.

```kotlin
@Component
class Filter : OncePerRequestFilter() {
    @Autowired
    lateinit var processor: Processor

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        val wrappedRequest = HttpServletRequestWrapper(request).apply {
            addHeader(Headers.EXTRA_HEADER, processor.process(request))
        }

        filterChain.doFilter(wrappedRequest, response)
    }
}
```

I want to test two things:

- The `filterChain` should be called with my `wrappedRequest`
- The `wrappedRequest` should have the correct header in it

## Setting up the test

I am using [JUnit 5](https://junit.org/junit5/) for the test (Speaking of native libraries, I haven't tried something like [Spock](https://dzone.com/articles/testing-kotlin-with-spock-part-1-object) yet). The basic setup of the test requires to set up the filter and the mocks that I need.

```kotlin
@ExtendWith(MockKExtension::class)
internal class FilterTest {
    val request = MockHttpServletRequest()

    @MockK
    lateinit var response: HttpServletResponse

    @RelaxedMockK
    lateinit var filterChain: FilterChain

    val filter = Filter().apply {
        processor = ProcessorImpl()
    }
}
```

I am using annotations to initialize the mocks (which requires annotating the test with `MockKExtension`). My `filterChain` is a `RelaxedMockK`, which means that its methods will return a default value unless otherwise specified.

## A very simple test

If I just want to check that the method is being called, I don't really need much

```kotlin
@Test
fun `calls the next step in the filter`() {
    filter.doFilter(request, response, filterChain)
    verify { filterChain.doFilter(any(), response) }
}
```

## Testing the wrapped request

The previous test is OK, but it is a bit bland for my taste. I want to make sure that that the `filterChain` is being called with my `wrappedRequest`, and that it contains the header I injected. This test becomes much more interesting

```kotlin
@Test
fun `injects header into the request and passes it to the filter`() {
    filter.doFilter(request, response, filterChain)

    slot<ServletRequest>().let { slot ->
        verify { filterChain.doFilter(capture(slot), response) }

        expect(slot.captured).isA<HttpServletRequestWrapper> {
            expect(subject.getHeader(Headers.EXTRA_HEADER)).toBe("value")
        }
    }
}
```

Not so simple anymore! Let's break it down.

First we are capturing the first argument for `doFilter` (i.e: the wrapped request). We are creating a new slot by doing `slot<ServletRequest>`, and capturing it by passing it in the `verify` block by doing `capture(slot)`. The `let` block wrapping everything is there so that we don't need an extra local variable (and to feel more kotlin-y inside).

After all this `slot.captured` contains the `wrappedRequest` that we created in the filter. Here is where _Atrium_ can shine. We use `isA` first to check that the request is of the right type. Then inside the block `subject` is the casted type, where we finally check that our header is there. 

## Summary

With this our small filter can be tested properly and with very little overhead. I am no _Kotlin_ connoisseur, but the syntax of both _MockK_ and _Atrium_ feels quite elegant to me, once you wrap your head around it. I think this is a good starting point to build better and better tests without a ton of boilerplate code.




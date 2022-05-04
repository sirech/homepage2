---
title: "Making a Microservice More Resilient Against Downstream Failure"
date: "2022-04-28"
layout: post
path: "/making-a-microservice-more-resilient-against-downstream-failure/"
description: ""
categories:
  - Software Engineering
  - Monitoring
  - DataDog
  - Netflix
  - resilience4j
draft: true
related:
  - /monitoring-alerts-that-dont-suck/
  - /synthetic-transactions/
  - /multiwindow-multi-burn-rate-alerts-in-datadog/
---

Monitoring and [alerting](../monitoring-alerts-that-dont-suck/) services is something that has taken a lot of my time for the past year. Nowadays, I like using [SLOs](../multiwindow-multi-burn-rate-alerts-in-datadog/) as a shared language to express expectations around the operational stability for any production grade service.

All these metrics are worthless if you don't do anything about them! That's exactly what I want to talk about. Concretely, I'm going to talk about making services more tolerant against downstream failures, using the wonderful [resilience4j](https://resilience4j.readme.io/).

## Instability Can Ruin Your Day

I was part of a team maintaining a service. That service was very visible for users, but didn't own any data. It relied on plenty of downstream dependencies. Sadly, those were very unstable and experienced frequent downtime. Those propagated to our service, which made us look bad. Check these error spikes:

<figure class="figure">
  <img src="./images/errors.png" alt="Error Rate" />
  <figcaption class="figure__caption">
  Shit is hitting the fan
  </figcaption>
</figure>

Given that this was weighting on our [On-Call](https://github.com/sirech/talks/blob/master/2021-11-devoxx-humane_on_call_alerting_doesnt_have_to_be_painful.pdf) experience, we _had_ to do something about it. It was leading to a dangerous spiral that could only end in burn-out.

## Enter Resilience4j

Our service is written on Java. That makes `resilience4j` a perfect fit. It's a library that provides a whole bunch of operators to increase fault tolerance. As a bonus, it's based on [vavr](https://www.vavr.io/) and thus it benefits from things like [Either types](../kotlin-either-types-instead-of-exceptions/) and all that good stuff.

Now, there are two aspects I want to talk about:

- Using resilience operators to make our micro service a better citizen in the ecosystem
- Building a Fallback Cache to prevent downstream errors from reaching our users

Let's get some code to show how this looks like.

## Using Resilience Operators

`resilience4j` provides a bunch of [operators](https://resilience4j.readme.io/docs) out of the box. One big plus of the library is its composability. There's little difference between only using a [Retry](https://resilience4j.readme.io/docs/retry) alone, or piping other operators, like a [CircuitBreaker](https://resilience4j.readme.io/docs/circuitbreaker). I'm not getting into the details of how they work, head over the documentation to get more details.

If you use [Spring Boot](todo link), there's support for using annotations. There's always support for annotations if SpringBoot is involved, isn't it? In my case, that led to a fair amount of code duplication, so I ended building a small abstraction called a _FallbackCache_. Before we get to the caching part, let's focus on instantiating these operators. The code is quite declarative:

snippet declaring operators

## Building a Fallback Cache

Building resilience operators is only one part of the equation. If you do a number of retries without success, or the circuit breaker is open, then what?

Our answer is a fallback cache. The flow is as follows:

![fallback calls]

```java
public class SyncFallbackCache<T, R extends Cacheable<T>> extends AbstractFallbackCache<T, R> {
  public SyncFallbackCache(
      String name,
      CrudRepository<R, String> cache,
      CircuitBreaker cb,
      Retry retry,
      MeterRegistry meterRegistry
  ) {
    super(name, cache, cb, retry, meterRegistry);
  }

  /**
   * Fetches data synchronously using the semantics described in {@link AbstractFallbackCache}.
   *
   * @param key           the key that identifies the object
   * @param valueSupplier a supplier to perform the call
   * @return the data returned from the service, or from the cache
   * @throws io.github.resilience4j.circuitbreaker.CallNotPermittedException if the service is unhealthy and the
   *                                                                         circuit breaker is open
   * @throws RuntimeException                                                if the service throws an exception and
   *                                                                         there's no cached value to serve
   */
  public T get(String key, Supplier<R> valueSupplier) {
    Supplier<T> decoratedSupplier = Decorators.ofSupplier(() -> getAndCache(key, valueSupplier))
        .withRetry(retry)
        .withCircuitBreaker(cb).decorate();

    return Try.ofSupplier(decoratedSupplier)
        .recover(RuntimeException.class, (exception) -> getFromCacheOrThrow(key, exception))
        .get();
  }

  public static <X, Y extends Cacheable<X>> SyncFallbackCache<X, Y> of(
      String name,
      CrudRepository<Y, String> cache,
      MeterRegistry meterRegistry
  ) {
    return of(name, cache, getCircuitBreaker(name, meterRegistry), getRetry(name, meterRegistry), meterRegistry);
  }

  static <X, Y extends Cacheable<X>> SyncFallbackCache<X, Y> of(
      String name,
      CrudRepository<Y, String> cache,
      CircuitBreaker circuitBreaker,
      Retry retry,
      MeterRegistry meterRegistry
  ) {
    return new SyncFallbackCache<>(name, cache, circuitBreaker, retry, meterRegistry);
  }
}
```

```java
public abstract class AbstractFallbackCache<T, R extends Cacheable<T>> {
  protected final CrudRepository<R, String> cache;
  protected final CircuitBreaker cb;
  protected final Retry retry;

  private final Counter hitCounter;
  private final Counter missCounter;
  private final Counter putsCounter;

  public AbstractFallbackCache(
      String name,
      CrudRepository<R, String> cache,
      CircuitBreaker cb,
      Retry retry,
      MeterRegistry registry
  ) {
    this.cache = cache;
    this.cb = cb;
    this.retry = retry;

    hitCounter = registry.counter("cache.gets", Arrays.asList(Tag.of("cache", name), Tag.of("result", "hit")));
    missCounter = registry.counter("cache.gets", Arrays.asList(Tag.of("cache", name), Tag.of("result", "miss")));
    putsCounter = registry.counter("cache.puts", Collections.singletonList(Tag.of("cache", name)));
  }

  protected static Retry getRetry(String name, MeterRegistry meterRegistry) {
    RetryRegistry retryRegistry = RetryRegistry.ofDefaults();
    TaggedRetryMetrics.ofRetryRegistry(retryRegistry).bindTo(meterRegistry);
    return retryRegistry.retry(name);
  }

  protected static CircuitBreaker getCircuitBreaker(String name, MeterRegistry meterRegistry) {
    CircuitBreakerRegistry circuitBreakerRegistry = CircuitBreakerRegistry.ofDefaults();
    TaggedCircuitBreakerMetrics.ofCircuitBreakerRegistry(circuitBreakerRegistry).bindTo(meterRegistry);
    return circuitBreakerRegistry.circuitBreaker(name);
  }

  protected T getAndCache(String key, Supplier<R> valueSupplier) {
    /*
      This has the disadvantage that the [get result, cache it] is not atomic. So if two requests try to update the
      same key at the same time, it might create an undetermined result.

      However, two calls to the same service should return the same value, so we should be able to live with that.

      This is not happening inside the compute method anymore due to problems acquiring the lock that led to
      significant timeouts.
     */
    var result = valueSupplier.get();
    if (result == null) {
      return null;
    }

    return Try.of(() -> {
      cache.save(result);
      putsCounter.increment();
      return result;
    })
        .recover(DataAccessException.class, e -> {
          log.error("Could not save result to cache", e);
          return result;
        })
        .map(Cacheable::data)
        .get();
  }

  protected T getFromCacheOrThrow(String key, RuntimeException exception) {
    var value = cache.findById(key);

    value.ifPresent((v) -> {
      log.info(String.format("FallbackCache[%s] got cached value", cb.getName()), v);
      hitCounter.increment();
    });

    return value
        .map(Cacheable::data)
        .orElseThrow(() -> {
              log.error(
                  String.format("FallbackCache[%s] got an error without a cached value", cb.getName()),
                  exception
              );
              missCounter.increment();
              throw exception;
            }
        );
  }

  public void clearCache() {
    cache.deleteAll();
  }
}
```

### Using the Abstraction

snippet usage

### Measuring Success

![hit rate]

## Persistent Caching

doing ephemereal caching with containers is limited by design to the lifecycle of these containers. Our hit rates weren't good enough, to be frank.

We switched from in-memory caches to persistent ones. We used [Aerospike](todo link) for that. Our case is serializing data classes from and to JSON, so any highly-available datastore works in this scenario. Again, _SpringBoot_ has some integrations to make this easier:

snippet serializable model

Using the cache for failure scenarios means that invalidation isn't that relevant, which is good, because we don't get notified when the data becomes stale.

### Measuring Success (Part 2)

![hit rate]

That's a lot better, isn't it?


## Did It Work?

That's a fair question to ask. Did all this _actually_ work? Luckily, yes. Our error rate went from X to Y. A significant improvement that made a world of difference in our rotations.

  

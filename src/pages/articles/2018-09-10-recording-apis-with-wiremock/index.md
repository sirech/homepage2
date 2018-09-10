---
title: Recording APIs with WireMock
date: "2018-09-10"
layout: post
path: "/recording-apis-with-wiremock/"
categories:
  - Java
  - WireMock
  - Spring Boot
  - Testing
draft: false
---


<figure class="figure figure--right">
  <img src="./images/cassette.png" alt="Recording the API" />
</figure>

When an application depends on a third party API, you always seem to face similar challenges. Do you integrate against it, even in development? What about the tests, won't they be flaky if need it to be present for them to run?

Meanwhile, if you decide to use stubs, how sure are you that the application is, well, working? I can't remember how many times I have had perfectly green tests based on mocks that were not testing anything, because the API had changed in some way.

Recently I've been thinking about this, and I have tried to address this through API recordings.
I know this idea from the Ruby world, concretely [VCR](https://github.com/vcr/vcr). This time, however, I wanted to use it in a _Java_ project, so I looked at [WireMock](http://wiremock.org/).

<!--more-->

## Why?

Following the [Testing Pyramid](https://martinfowler.com/bliki/TestPyramid.html), we want to have most of our tests at the lowest possible level. Unit tests should not be doing network requests. On the other hand, if we use mocks, they should be close to the source, ideally based on actual requests.

If we have these mocks already, why not use them for our local development? I want my app to boot app and quickly show something, agian without the need to connect to the outside.

And, I want automation. Editing `.json` files by hand is a recipe for errors and outdated data. I want to avoid friction.

Thanks to _WireMock_, this process is very convenient and almost transparent to the app. A bit of plumbing is required, but it is _real easy_ to do.

## Mock me!

I have this [repository in Github](https://github.com/sirech/example-wiremock-recorder) with all the details. It can be summarized in one picture:

<figure class="figure">
  <img src="https://github.com/sirech/example-wiremock-recorder/raw/master/images/diagram.png" alt="Recording the API" />
</figure>

For the example API, I took this very useful [sample API](jsonplaceholder.typicode.com). There are four pieces to take into account in this setup.

### Production

The app in `production` mode goes directly to the API, just like that. The request is something like this:

```java
public List<Todo> todos() {
    ResponseEntity<List<Todo>> response = template.exchange(
            "/todos",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<Todo>>() {});
    return response.getBody();
}
```

### Development

For the development server, we rely on certain mocks being present, that we will serve transparently by starting a _WireMock_ server on startup. To do that in a [Spring Boot](https://spring.io/projects/spring-boot) project, we use this initializer:

```java
@Component
public class MockServerInitializer {
    @Value("${mock.active}")
    boolean active;

    @Value("${mock.port}")
    int port;

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if(active) {
            WireMockServer server = new WireMockServer(port);
            server.start();
        }
    }
}
```

It is important to set `mock.active` to `false` for any non-development environment. Other than that, we configuration points to the local server instead of the real API:

```yaml
serverUrl: http://localhost:${mock.port}
mock:
  active: true
  port: 8080
```

### Unit tests

The unit tests that need to use this mock data will use the same mocks from _WireMock_ that the development server uses. Activating the mocks is as easy as inheriting from the `RecordedTest` class, which looks like this:

```java
public abstract class RecordedTest {
    @Value("${record.port}")
    int port;

    WireMockServer server;

    @Before
    public void useMocks() throws Exception {
        server = new WireMockServer(port);
        server.start();
    }

    @After
    public void stopUsingMocks() throws Exception {
        server.stop();
    }
}
```

Inheritance and `@Before` and `@After` annotations is perhaps not a best practice, but it makes the tests really succint. Defining additional behavior is easy by just defining extra _WireMock_ rules. This way you can test more specific scenarios like timeouts while keeping most of the regular code quite clean.

### Integration tests

This is where everything comes together. Our integration tests make sure that the connection to the real API works. In the process, the interactions get recorded so that we can store that as the mocks that the rest of the app uses. To enable a test to become a `RecordingTest`, you need to inherit the class:

```java
public abstract class RecordingTest {
    @Value("${record.port}")
    int port;

    @Value("${record.proxyTo}")
    private String recordingServerUrl;

    @Value("${record.persist}")
    private boolean persistRecordings;

    @Value("${record.extractBody}")
    private int extractBody;

    private WireMockServer server;

    @Before
    public void setUp() throws Exception {
        server = new WireMockServer(port);
        server.start();
        server.startRecording(config());
    }

    @After
    public void tearDown() throws Exception {
        server.stopRecording();
        server.stop();
    }

    private RecordSpec config() {
        return recordSpec()
                .forTarget(recordingServerUrl)
                .makeStubsPersistent(persistRecordings)
                .extractTextBodiesOver(extractBody)
                .build();
    }
}
```

This class proxies all the requests to the real API, and stores them in the default folder when configured.

Why not every time? We don't want new files being created each time a test runs. Instead, this is a conscious decission, triggered with this script target:

```bash
goal_refresh-recordings() {
  RECORD_PERSIST=true RECORD_EXTRACTBODY=0 ./gradlew clean integration
}
```

After that the new recordings are present and ready to be used. This can be done manually or integrated into a pipeline, to make sure that it happens often.

*NOTE:* If the _Third Party API_ is secured through `mTLS`, you can still make this setup work by making _WireMock_ aware of the keystore that your code uses to connect to it, by creating a custom config for the _WireMock_ server:

```java
server = new WireMockServer(options()
        .trustStorePath(System.getProperty("javax.net.ssl.keyStore"))
        .trustStorePassword("changeit")
        .port(port));
```

## Summary

The setup contains a bit of magic, but the result is quite simple to use. This way, you can achieve a great testing coverage without compromising the development experience, all while keeping your core unit tests slim and fast. If you have fought with out-of-sync mocks before, you will see the advantage!

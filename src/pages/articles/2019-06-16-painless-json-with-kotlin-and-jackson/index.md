---
title: Painless JSON with Kotlin and jackson
date: "2019-06-16"
layout: post
path: "/painless-json-with-kotlin-and-jackson/"
categories:
  - Kotlin
  - JSON
  - Jackson
  - REST
  - SpringBoot
related:
  - /kotlin-either-types-instead-of-exceptions/
  - /descriptive-assertions-in-kotlin/
  - /book-review-kotlin-in-action/
draft: false
description: "Backends that provide a REST API or consume other APIs have to deal with JSON quite a lot. Luckily combining Kotlin and Jackson makes it a breeze"
---

It seems that many backends that provide a REST API end up being glorified proxies that move [JSON](https://www.json.org/) from one place to another. It is especially true if you are trying to keep those backends as simple as possible ([Microservices](https://microservices.io/patterns/microservices.html) anyone?). Having the right tools to parse and produce JSON can thus make a big impact in keeping the code tidy and compact. I want to talk about my experience using [Kotlin](https://kotlinlang.org/) and [Jackson](https://github.com/FasterXML/jackson) for this.

<!--more-->

I remember that dealing with JSON in Java used to be pretty painful back in the day, as you had to write a ton of code to map objects. That is what initially led me to use [Ruby](https://www.ruby-lang.org/en/). Things have changed a lot (for the better!) since then. Nowadays, using _Kotlin_ and _Jackson_ you can deal with JSON with minimal effort. _Jackson_ is a mighty library, but you can get lost easily. I have a bunch of examples showing how to parse different classes, plus some code to integrate it into your workflow. In this case, I will be using [SpringBoot](https://spring.io/).

### Serialize/Deserialize

We will be using [data classes](https://kotlinlang.org/docs/reference/data-classes.html) to represent the entities that will get converted to a from JSON. They are the equivalent of using the [@Value](https://projectlombok.org/features/Value) annotation in _Lombok_, with first-class support from the language. They are immutable (yay!) and have convenience methods like `equals` and `toString` out of the box.

You can use an [ObjectMapper](https://fasterxml.github.io/jackson-databind/javadoc/2.7/com/fasterxml/jackson/databind/ObjectMapper.html) to do the parsing, although you can configure _SpringBoot_ to do it mostly automatically, which I will show later. I have a `User` entity with two fields that I want to convert to JSON and back.

```kotlin
data class User(val id: String, val age: Int)

fun User.toJson(): String = ObjectMapper().writeValueAsString(this)
fun String.toUser(): User = ObjectMapper().readValue(this)
```

For simple cases, just defining the data class is enough, as long as you have the [right module](https://github.com/FasterXML/jackson-module-kotlin). There are a bunch of extra configurations that you can do on top of it, though. Many of them can be controlled with annotations, which make the code a lot more compact. Abusing them will turn your code into an unmaintainable mess, though.

#### Nullability

If some of the fields are optional, you provide default values.

```kotlin
data class User(
  val id: String = ""
)
```

You can also allow them to be `null`.

```kotlin
data class User(
  val id: String?
)
```

not doing anything will make the parsing fail with an exception, which I find a good thing.

#### Aliasing

If you are parsing your object from a different source that uses different attribute names, but still want to keep a _canonical_ representation, `@JsonAlias` is your friend.

```kotlin
data class User(
  @JsonAlias("userId")
  val id: String
)
```

this will correctly parse something like

```json
{
  "userId": "123"
}
```

#### Ignore properties

Maybe you are parsing an object with a ton of fields that you don't need. If you are not going to use it in your code, you really should avoid adding them, as that makes it harder to understand what is needed and what is not. `@JsonIgnoreProperties` can be used for this.

```kotlin
@JsonIgnoreProperties(ignoreUnknown = true)
data class User(val id: String)
```

#### Different representations

If your backend is acting as a proxy, you will be reading your data from somewhere and passing it to your client. In this case, you might want to skip some fields in the serialization to give your client precisely the fields it needs. You can accomplish this by customizing the access property.

```kotlin
data class User(
  val id: String = "",
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  val age: Int
)
```

The serialization of this object won't contain the `age`, but it is available in our code. This approach does not scale that well, however. If you find that you have two different representations of the same entity and are adding a ton of annotations to use one class, it's probably better to split it into two distinct classes and provide a method one into the other.

This underscores an important point. You don't need to use annotations and implicit conversions for everything. In some places having dedicated converters is just more readable, more so if you want to attach some logic to that process.

#### And if you want more...

This article shows just a small part of what is possible to do. You can control every aspect of the serialization/deserialization process. Have a look at [this post](https://www.baeldung.com/jackson-annotations) if you want to know about other options.

---

### Getting away from untyped strings

In JSON you tend to use strings to represent many entities. Any id type like a user id, or something like a language code, for example. I prefer mapping them to dedicated classes in my code. I've seen many bugs where the wrong entity is used when that could be prevented directly by the compiler. Taking a `UserId` as an example, I like to model it as follows:

- It should be an immutable data class
- It should not force a change in the structure of the JSON (i.e., no nesting)
- Serialize/Deserialize should work out of the box

```kotlin
data class UserId(private val value: String) {
    companion object {
        @JvmStatic
        @JsonCreator
        fun create(value: String) = UserId(value.toLowerCase())
    }

    @JsonValue
    override fun toString() = value
}
```

By using a data class, we get an immutable object that represents this entity. We can do relatively little with it. In fact, we don't even want access to the internal fields. We are going to compare instances directly, and if we need to get a string representation, we'll do that through the `toString` method.

The serialization happens through the `@JsonValue` annotation, where we use the value directly. If we modify our `User` class that we have been using before, it will look like this.

```kotlin
data class User(val id: UserId, val age: Int)
```

That class serializes to this JSON

```json
{
  "id": "123",
  "age": 20
}
```

That representation matches how most clients (especially a frontend) would expect this structure to look like, without sacrificing any safety in the backend.

The deserialization happens automatically. However, I like to define a static constructor (using the `@JvmStatic` and `@JsonCreator` annotations) so that I can do things like sanitizing the input before generating my instance. This helps to make sure our models are in a consistent state.

Since Kotlin 1.3, a new concept called [inline classes](https://kotlinlang.org/docs/reference/inline-classes.html) has been introduced, which might match better with this use case. Jackson has some trouble deserializing it properly in nested objects as of 16/06/19, so I could not replace my data classes with it so far. There is an [open issue in Github](https://github.com/FasterXML/jackson-module-kotlin/issues/199) to follow.

---

### SpringBoot integration

Here we get the last piece of the puzzle. We can manually use an `ObjectMapper` and convert things explicitly. It is much easier if that happens on its own. The good news is that there is not much to do here other than adding the [jackson-module-kotlin](https://github.com/FasterXML/jackson-module-kotlin) as a dependency:

```gradle
implementation("com.fasterxml.jackson.module:jackson-module-kotlin:${jacksonVersion}")
```

If you are using the latest versions of everything, that will be enough. If the spring magic does not happen on its own (spring does a lot of magic that I don't quite understand), you can do it manually. You can use a `@Configuration` so that your controllers can map to and from JSON automatically.

```kotlin
@Configuration
class JacksonConfiguration {
    @Bean
    fun mappingJackson2HttpMessageConverter(): MappingJackson2HttpMessageConverter {
        return MappingJackson2HttpMessageConverter().apply {
            this.objectMapper = ObjectMapper().apply {
                registerModule(KotlinModule())
            }
        }
    }
}
```

if you are making REST request to another service, you can build a custom `RestTemplate` doing the same:

```kotlin
open class DefaultRestTemplate(baseUrl: String) :
        RestTemplate(HttpComponentsClientHttpRequestFactory(
                HttpClientBuilder.create().useSystemProperties().build())) {
    init {
        uriTemplateHandler = DefaultUriBuilderFactory(baseUrl)
        messageConverters = jacksonConverter(messageConverters)
    }

    private fun jacksonConverter(converters: MutableList<HttpMessageConverter<*>>): List<HttpMessageConverter<*>> {
        val jsonConverter = MappingJackson2HttpMessageConverter()
        jsonConverter.objectMapper = jacksonObjectMapper().apply {
            registerModule(KotlinModule())
        }
        converters.add(jsonConverter)
        return converters
    }
}
```

Again, all this should happen by just adding the library to the classpath. Use this as a fallback in case that does not work for some reason. Also, this template can be extended to use a base URL, receive environment variables (to include the keystore for instance), or automatically add certain headers to your requests.

#### PathVariables are not JSON

Now that we are waist-deep in automated JSON mapping, I'm getting ambitious. As mentioned above, we are no longer using plain strings but proper domain classes. Let's say you have a route like `GET /users/:userId`. The controller would look like this:

```kotlin
@RestController
@RequestMapping("/users", produces = [MediaType.APPLICATION_JSON_VALUE])
class HelloController {
    @GetMapping("{userId}")
    fun user(@PathVariable("userId") userId: UserId): ResponseEntity<User>
}
```

If you send a request to this route, the `userId` will get parsed automatically, but our custom `create` method won't get called, because this is a URL, not JSON. We didn't come this far to start parsing strings manually again. Let's fix this by using a custom converter.

```kotlin
@Configuration
class ConverterConfiguration : WebMvcConfigurer {
    override fun addFormatters(registry: FormatterRegistry) {
        registry.addConverter(userId())
    }

    private fun userId(): Converter<String, UserId> {
        return Converter<String, UserId> { source -> UserId.create(source) }
    }
}
```

That's it. Now we can be sure that those pesky strings are not floating through our app at any point in the flow of a request.

### Summary

Jackson is a very powerful library, and to be honest, you can overdo it with all the annotations. If you use them judiciously, though, working with JSON becomes very easy while keeping a good amount of type safety in the process. For testing, this goes well with [recorded APIs using WireMock](https://hceris.com/recording-apis-with-wiremock/).

*EDIT 25/12/2019:* Grammar review

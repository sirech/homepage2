---
title: What Is Code Duplication? A Definition and Overview
date: "2021-04-18"
layout: post
path: "/what-is-code-duplication-definition-and-overview/"
categories:
  - Practices
  - Architecture
  - Software Engineering
related:
  - /book-review-working-effectively-with-legacy-code/
  - /getting-technical-stories-into-an-iteration/
draft: false
description: "Code duplication makes software less maintainable and reduces our ability to iterate fast. Learn what duplication is and how to prevent it"
image: ./images/cover.jpeg 
canonical: https://linearb.io/blog/code-duplication/
---

<figure class="figure figure--left">
  <img src="./images/cover.jpeg" alt="Duplication" />
</figure>

Code duplication is a common ailment in many codebases throughout the software industry.

Many projects are declared to be of poor quality due to excessive duplication, and developers lament the state of affairs.

In this post, I'm going to talk about what code duplication is and why it's a drain on quality. After that, I'll explain what you can do to prevent and fix it.

<h2>What Is Code Duplication?</h2>

Simply put, it's when a snippet of code appears multiple times throughout a codebase. It happens for many reasons:
<ul>
 	<li>Somebody wanted to reuse a function in a different class, and copy-paste was the quickest solution.</li>
 	<li>People independently developed the same functionality in two places simultaneously.</li>
 	<li>A class evolved in functionality until it covered most of what another class does.</li>
</ul>
Regardless of the reason, the consequence is that you have the same code in more than one spot.

People without a background in software development might wonder: <em>So what?</em> However, this isn't just a stylistic matter. There are real downfalls associated with code duplication.

Before we talk about those problems, let's have a look at an example.

Let's say you're keeping track of the stories assigned to a developer. You're applying some logic to format those IDs. Now, there's a different entity, <strong>Operator</strong>, that follows the same logic. To save time, a developer reused the code, thus generating duplication.

```ruby
class Developer
  attr_reader :assigned_stories

  def initialize(*stories)
    @assigned_stories = stories
  end

  def format
    assigned_stories
      .filter { |id| id &lt; 100 }
      .map { |id| "story-#{id}" }
  end
end

class Operator
  attr_reader :assigned_stories

  def initialize(stories)
    @assigned_stories = stories
  end

  def format
    assigned_stories
      .filter { |id| id &lt; 100 }
      .map { |id| "story-#{id}" }
  end
end
```

As you can see, the same functionality exists in two places. And as you introduce other entities in your domain, this duplication might spread even more.

<h2>The Issue With Code Duplication</h2>

As Robert C. Martin ("Uncle Bob") eloquently explains in his book, <em>Clean Code</em>:
<blockquote>Duplication may be the root of all evil in software.</blockquote>
Duplication greatly decreases the maintainability of your code. Ideally, introducing a change in business logic should require your team to change one class or function, and no more. Otherwise, a developer has to spend extra effort hunting down all these extra occurrences. Additionally, there's the risk of <em>forgetting</em> some of them. Now your application behaves inconsistently because your team didn't apply the change uniformly!

Code duplication is enough of a challenge in the industry that one of the best-known software engineering practices is Don't Repeat Yourself ([DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)).

Do you need to be worried about code duplication? I say yes.
<ul>
 	<li>Having to change the same code multiple times harms your [cycle time](https://linearb.io/cycle-time).</li>
 	<li>If you have to apply a change in multiple places, then implementing that change will take longer.</li>
 	<li>If the duplication is pervasive enough, it'll lead to a decreased delivery speed.</li>
</ul>

We aren't talking about technical preferences anymore. Slower delivery is a business outcome you'll definitely want to avoid. So, code duplication isn't just a nuisance but a business risk as well.

<h2>How to Measure Code Duplication</h2>

Teams often measure code duplication qualitatively, based on the perception of the members of the team. It's a limited approach due to subjectivity. Still, it works as a first check.

There are tools to help you if you're aiming for concrete numbers. For instance, [SonarQube](https://www.sonarqube.org/) inspects a codebase and computes quality metrics, including code duplication. In this case, duplication means syntactically identical fragments, with some tolerance allowed for comments and variable names, for instance. In other words, blocks that are very similar but not identical still count.

<h2>How Much Duplication Is Too Much?</h2>

You might think that it's sensible to define an upper limit of the amount of duplication you want to tolerate and fail the build if you surpass it. But trying to define arbitrary cutoff values is difficult, as you always need context when interpreting these numbers.

I prefer observing trends instead. If you store this data over time and notice a marked increase, it's probably time to bring the team together to discuss how to handle it.

Additionally, measuring something close to a developer's heart, like duplication, is a great way to move toward a more [data-driven culture](https://linearb.io/blog/how-to-introduce-data-driven-culture-to-your-dev-team/).

<h2>How to Avoid Code Duplication</h2>

Duplication is a sign that the same<em> concept</em> is appearing multiple times throughout the codebase. It suggests that the system's architecture hasn't been defined cleanly.

You have the opportunity to avoid duplication before a single line of code is written if you stop and think about the architecture of your application. You don't want to waste time creating a big, comprehensive architecture up front, though. Instead, try to use lightweight paradigms that guide you without slowing you down. I have two in mind.

<h2>Domain-Driven Design</h2>

Domain-driven design (DDD) is a broad subject with a bigger scope than just avoiding duplication. If you zoom in, [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html) are an excellent way to identify subsystems that are separated from each other. The ultimate goal is to figure out which business entities form your system and create clear boundaries between them.

If you break up the domain, it's less likely that you'll re-create the same object, class, or function multiple times. If you do, it may indicate that you're in fact dealing with two things that look alike but are different. I'll mention this again when I get to fixing duplication.

<h2>DRY (and a bit of SOLID)</h2>

If there's one takeaway from this article, it's this: A modification of the business logic should lead to changing <em>one</em> class or function. That's a pretty good indication of the health of your code. That's the idea behind DRY. You shouldn't represent a concept more than once in your code. If you do, it'll bring trouble.

In addition, you can bring [SOLID principles](https://en.wikipedia.org/wiki/SOLID) to enhance your architecture further. SOLID is an acronym that refers to five principles to structure software. Let's focus on the S. It stands for [single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle). It's defined as the idea that one class should have only one reason to change.

While this principle doesn't address duplication directly, when combined with DRY, it leads to a stronger design. Through DRY, you need to change only one class or function for every business change. And then, by using SRP classes, you have only one responsibility. The combination of both simplifies identifying and applying changes to a system. That's because you know there will be exactly one place to modify, and that change by definition won't impact any other area.

<h2>How to Fix Code Duplication</h2>

Once duplication is in your code, you have to move from prevention to action. The canonical way of getting rid of duplication is through [refactoring](https://refactoring.com/). Much is available on the topic. The most important thing to remember: Before refactoring code, you must ensure that it's covered by tests. Without them, you're just praying that the result will work.

Coming back to the previous example, you've defined your expectations through this test:

```ruby
describe Developer do
  let(:subject) { Developer.new(1, 2, 3, 4, 5, 101) }

  it 'filters ids past 100' do
    expect(subject.format).not_to include('story-101')
  end

  it 'formats the ids into story ids' do
    expect(subject.format).to include('story-1')
  end
end
```

For this scenario, the most natural way of getting rid of the duplication is by extracting the method to a shared concern. It corresponds loosely to the [pull-up method](https://refactoring.com/catalog/pullUpMethod.html) of refactoring. You can do that and let both classes use it.

```ruby
module Formatter
  attr_reader :assigned_stories

  def format
    assigned_stories
      .filter { |id| id &lt; 100 }
      .map { |id| "story-#{id}" }
  end
end

class Developer
  include Formatter

  def initialize(*stories)
    @assigned_stories = stories
  end
end

class Operator
  include Formatter

  def initialize(stories)
    @assigned_stories = stories
  end
end
```

Now, the code implementing your logic is present in only one place. If you have to change it in the future, you have one unique place to modify.

This change will have a positive impact on the [rework ratio](https://linearb.io/dev-team-metrics/). Why? Well, you need to modify only one function instead of two. And the same applies if you need this functionality elsewhere. You can reuse it as many times as needed because they all refer back to the canonical implementation.

<h2>Beware of Code That Looks Similar But Isn't</h2>

There's one important caveat to mention. Just because two snippets of code look similar, it doesn't necessarily mean they represent the same concept. If the team follows a consistent approach, they'll naturally use similar structures for different business domains. I consider this to be a good thing, as it makes the code more consistent.

It's tempting to try to eliminate <em>any</em> duplication by abstracting every possible block. However, this leads to increased coupling. You're introducing dependencies between entities that exist separately, which makes it harder to change them, decreasing your maintainability again.

Every time you refactor code, ask yourself if the duplication you're trying to change is incidental or indicates a design problem. Being too zealous might create a different issue.

<h2>Conclusion</h2>

Duplication looks simple on the surface. Yet, it has a surprising amount of depth associated with it. Your goal is to make sure that any application is evolvable and maintainable. You'll want to be able to make changes quickly so that you remain able to iterate quickly.

To handle duplication, you need to recognize it first and refactor the code continuously to keep it healthy. However, you also need to be careful not to over-abstract things and end up with a harder system to maintain.

*This post was published initially in [LinearB](https://linearb.io/blog/code-duplication/).*

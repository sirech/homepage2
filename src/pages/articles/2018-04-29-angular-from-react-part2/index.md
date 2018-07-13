---
title: Angular from the perspective of a React fan - Part 2
date: "2018-04-29"
layout: post
path: "/angular-from-react-part2/"
categories:
  - JavaScript
  - React
  - Angular
  - TypeScript
  - angular-cli
draft: false
---

<div class="guide">

### Angular Series

- [Part 1 - Bootstrapping and TypeScript](../angular-from-react-part1/)
- [**Part 2 - Testing**](../angular-from-react-part2/)
- [Part 3 - State Management](../angular-from-react-part3/)

</div>

The first part of the series was about the first steps when setting up _Angular_. In this post I want to talk about testing. This has been the part that has disappointed me the most thus far. Compared to something like [Jest](https://facebook.github.io/jest/), it does not seem to be that straightforward to set up your testing. Writing new tests for _Angular_ reminds me to an old project where we used [QUnit](http://qunitjs.com/), where writing JS Tests was something that everybody actively tried to avoid.

## The importance of testing

I have been trying to focus much more on [TDD](https://en.wikipedia.org/wiki/Test-driven_development) lately. This is a good practice to follow in general. When you are working with an unfamiliar technology putting extra focus on testing can give you a lot more confidence to change things.

If you want to do any decent [CI/CD](https://en.wikipedia.org/wiki/CI/CD), there is no other way than having a good suite of tests that are easy to maintain and expand, which run reliably fast. The framework plays a big role in ensuring that, or at least it should get out of the way so that you can build what you need on top of it.

<!--more-->

## Speed

[Fast tests](https://xkcd.com/303/) are not a luxury, but a crucial requirement
in order to have a quick feedback loop. In turn, that enables you to move
quickly with small changes, always being in a state that works. Here is the
point where _Angular_ drops the ball the most. This prompt has become a big part
of my life lately:

```bash
npm t
01 05 2018 00:39:58.283:INFO [karma]: Karma v2.0.0 server started at http://0.0.0.0:9876/
01 05 2018 00:39:58.285:INFO [launcher]: Launching browser ChromeHeadless with unlimited concurrency
01 05 2018 00:39:58.372:INFO [launcher]: Starting browser ChromeHeadless
01 05 2018 00:40:29.587:INFO [HeadlessChrome 67.0.3391 (Mac OS X 10.13.4)]: Connected on socket jC8ho-ctNv4E4irCAAAA with id 26948242
```

For reasons that I do not quite understand, even running simple unit tests requires launching an instance of _Headless Chrome_. Coming from _Jest_, having to wait two minutes to run a single test drives me crazy. In theory there is a watch mode, but I was told that, at least on our project, it was not reliable at picking up changes.

And speaking of running single tests, the only way I have found to run single tests is to use `fit` or `fdescribe` blocks, which is quite inconvenient. [It seems](https://stackoverflow.com/a/43669082/3785) that there is no easy way of achieving this, so I might have to give the watch mode another try. For now we had to configure [tslint](https://palantir.github.io/tslint/) so that it fails when you accidentally commit this blocks. Otherwise you might disable most of your test suite by mistake.

In any case, this is a pretty big drawback. Having to wait for your simple test over and over totally takes me out of the flow, and is very tempting to take shortcuts and build a lot of changes at once, instead of testing them separately. I really hope that this is just me using the tool incorrectly, and that enlightment will come when I least expect it. My faith has not been rewarded thus far.

## Unit Tests

There are two main types of unit tests that I have been writing: Tests for services and components. Services are fairly straightforward, as they tend to be pure functions that can be easily tested. Remote calls can be mocked fairly easily with [Jasmine](https://jasmine.github.io/).

Components need their own section.

### Testing components

My first instinct when starting to work on an `Angular` project was to break the bigger components apart into multiple small [presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). However, writing some simple unit tests for them has proven to be quite challenging.

When testing small simple components that don't manage any state, I often find it enough to either do a sanity check (the component can be rendered without an error), or a simple snapshot test to have a glance at the html. It could look like this in _React_: 

```javascript
import React from 'react'
import { shallow } from 'enzyme'
import Techs from './Techs'

describe('components', () => {
  describe('Techs', () => {
    it('renders correctly', () => {
      const component = shallow(<Techs />)
      expect(component).toHaveLength(1)
    })
  })
})
```

I wanted to do a similar thing in _Angular_, and I have had a lot of trouble to
achieve the same result without writing a lot of code. Thankfully, a colleague of mine [already wrote about this](https://medium.com/@AikoPath/testing-angular-components-with-input-3bd6c07cfaf6). As far as I know, this is the smallest sanity check test that you can get for an _Angular_ component:

```javascript
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MyComponent} from './my-component.component';

describe('MyComponent', () => {
  @Component({
    selector: `host-component`,
    template: `
      <my-component [count]="count"></my-component>`
  })
  class TestHostComponent {
    count = 3
  }

  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MyComponent, TestHostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostFixture.componentInstance).toBeTruthy();
  });
});
```

That is a lot of cruft just to render a simple component! You need to create a mock component to wrap the one that you one to test, and do a bunch of initializations with `TestBed`. Also, this seems to get more and more complex the more your component grows. Compared to [Enzyme](https://airbnb.io/enzyme/) this feels quite heavyweight. Again, you can actually test everything you want. But the more friction you add the bigger the chance that shortcuts will be taken.

Another point of confusion to me is when to use `detectChanges` and `whenStable` in tests. I have seen tests that use them in different combinations. They tend to break easily if you don't use the right order as well.

## End to end tests

Given that you are already using a browser for unit tests, the conceptional jump to full end to end tests is smaller than in other frameworks. _Angular_ uses [Protractor](https://www.protractortest.org/#/), which sits on top of [Selenium](https://www.seleniumhq.org/). In completely expected news, they suffer from the same flakyness that every other _e2e_ framework has. Making sure that you test at the right level can save you a lot of pain. Don't write an _e2e_ test when a unit test will suffice!

## The right level of testing

What more is there to say about this? Just read [the testing pyramid](https://martinfowler.com/bliki/TestPyramid.html). This reminds me about discussions I had in the past about the need of having automated tests. Luckily that war seems to be over. Writing tests at different levels of integration instead of just doing super high level tests has now taken its place.

## Next

Testing has been pretty rough thus far. Working on an app that is poorly architected does not help, but it is still more painful that you would expect nonetheless. Another area that was very important to me, coming from _React_, was state management. I will talk about that in the next entry.


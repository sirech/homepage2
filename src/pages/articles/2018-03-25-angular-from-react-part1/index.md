---
title: Angular from the perspective of a React fan - Part 1
date: "2018-03-25"
layout: post
path: "/angular-from-react-part1/"
categories:
  - JavaScript
  - React
  - Angular
  - TypeScript
  - angular-cli
draft: false
---

I have using [React](https://reactjs.org/) in personal and work projects for about two years already. I like it so much that I wanted to change my middle name to _React_, but then I realized that I do not have a middle name.

Anyways, I recently started on a new project, and they built the frontend using ... [Angular](https://angular.io/). Rewriting it from scratch just because the new guy really likes something else is frowned upon by people who like delivering software to customers and stuff like that, so I found myself with no other option than finally digging into it.

I am grossly unqualified to give opinions about _Angular_, but that won't stop me from doing it anyways. I want to write about my impressions thus far, comparing it with what I am used to doing in the _React_ world. Note that I started directly with _Angular 4_, and I have zero plans to check _AngularJS_ anytime soon, so I might be missing a lot of context about why things are as they are in `ng`.

I will start with the basics, bootstrapping, defaults and so on. 

<!--more-->

## Bootstrapping

Bootstrapping is kind of a dirty word in the _React_ world. Setting up a new project is, frankly, a pain in the ass. I personally decided at some point that keeping up with [Webpack](https://webpack.js.org/) is a full time job, so I have outsourced my configuration to [Create React App](https://github.com/facebook/create-react-app). Even then, I am still waiting for things like _CSS Modules_ out of the box. Cannot say that this is perfect.

_Angular_, on the other hand, follows more of a **batteries included** approach. Once you have the package, you get a very comprehensive initial setup just by running

```bash
ng new awesome-app
```

which installs a bunch of stuff. Let's have a look at what the `awesome-app` directory

```bash
-rw-r--r--   1 mfernandez 1.3K Mar 25 22:36 .angular-cli.json
-rw-r--r--   1 mfernandez  245 Mar 25 22:36 .editorconfig
drwxr-xr-x  12 mfernandez  384 Mar 25 22:39 .git
-rw-r--r--   1 mfernandez  544 Mar 25 22:36 .gitignore
-rw-r--r--   1 mfernandez 1.1K Mar 25 22:36 README.md
drwxr-xr-x   5 mfernandez  160 Mar 25 22:36 e2e
-rw-r--r--   1 mfernandez  923 Mar 25 22:36 karma.conf.js
drwxr-xr-x 894 mfernandez  28K Mar 25 22:37 node_modules
-rw-r--r--   1 mfernandez 415K Mar 25 22:37 package-lock.json
-rw-r--r--   1 mfernandez 1.3K Mar 25 22:36 package.json
-rw-r--r--   1 mfernandez  722 Mar 25 22:36 protractor.conf.js
drwxr-xr-x  14 mfernandez  448 Mar 25 22:36 src
-rw-r--r--   1 mfernandez  363 Mar 25 22:36 tsconfig.json
-rw-r--r--   1 mfernandez 3.0K Mar 25 22:36 tslint.json
```

A lot of goodies straight from the beginning! I love free stuff. You have [tslint](https://palantir.github.io/tslint/) configured, [karma](https://karma-runner.github.io/2.0/index.html) for the unit tests, and even end-to-end tests with [protractor](https://www.protractortest.org/#/). Pretty impressive. I wish it was as easy to get started in _React_.

It is _very_ opinionated, though. It seems there is a strong consensus in the community regarding the tools to use. `npm` is favored over `yarn`, `TypeScript` over `JavaScript`, and so on.

## TypeScript

I remember back in my old company there were some internal discussions regarding typing in JS. One camp favored [TypeScript](http://www.typescriptlang.org/), the other _JavaScript_ and [Flow](https://flow.org/). I ended up going with _flow_, but I always had the feeling that it was not catching a lot of errors, and that I was spending a lot of time making it sort of work, like with [flow-typed](https://github.com/flowtype/flow-typed). I haven't yet fully understood the whole type system that _TypeScript_ provides, yet you can see that there is one important difference with flow. It is much more integrated with the core language itself, which makes it a lot more reliable in my impression.

_TypeScript_ is refreshing in a sense because things seem to work more naturally. The tooling seems to be very mature as well, from what I have seen from other people using _Visual Studio Code_ or _IntelliJ_ (not that I would know anything about that, I remain loyal to _Emacs_). In any case, I have found it pretty enjoyable thus far to work with.

In a sense, it feels like it is bringing _JavaScript_ closer to _Java_. This might sound like treason, but it can allow you to build more resilient software. Things like [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) or [private modifiers for class members](https://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers) help to avoid surprises and to build more isolated components. For projects with multiple developers working on the same codebase I can see this leading to a better overall architecture.

_TypeScript_ is being driven pretty heavily by _Microsoft_. They are actively developing features themselves, but also porting the [proposals](https://github.com/tc39/proposals) that come into _EcmasScript_. I was a bit confused in the beginning about that, but you only have to remember that only stage 3 proposals or above seem to be supported. I found [this](http://kangax.github.io/compat-table/es2016plus/#typescript2_8) site that allows you to check exactly which features are supported. 

## Linting

I am a big fan of linting, and `ng` delivers by including a config for [tslint](https://palantir.github.io/tslint/) out of the box. You just run `ng lint` and you get instant feedback.

Lately, however, I have been thinking about the role of a linter in general. After seeing how well [gofmt](https://golang.org/cmd/gofmt/) works, I am starting to think that a linter should not be concerned with the formatting of the code, just avoiding bad practices or possible bugs. In the case of _JavaScript_, I have experimented a bit with [prettier](https://github.com/prettier/prettier) to automatically format my code, although I have only used it thus far in personal projects. That is something I want to check in more detail in the future.

## Next

First impression was good, but other things have not worked that well. The next part will be about testing.




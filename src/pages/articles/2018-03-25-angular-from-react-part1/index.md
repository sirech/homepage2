---
title: Angular from the perspective of a React fan - Part 1
date: "2018-03-25"
layout: post
path: "/angular-from-react-part1"
categories:
  - JavaScript
  - React
  - Angular
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

I remember back in my old company there were some internal discussions regarding typing in JS. One camp favored [TypeScript](http://www.typescriptlang.org/), the other _JavaScript_ and [Flow](https://flow.org/). I ended up going with _flow_, but I always had the feeling that it was not catching a lot of errors, and that I was spending a lot of time making it sort of work, like with [flow-typed](https://github.com/flowtype/flow-typed).

_TypeScript_ is refreshing in a sense because things seem to work more naturally. The tooling seems to be very mature as well, from what I have seen from other people using _Visual Studio Code_ or _IntelliJ_ (not that I would know anything about that, I remain loyal to _Emacs_). In any case, I have found it pretty enjoyable thus far to work with.

## Next

First impression was good, but other things have not worked that well. One is testing. I plan to talk about that in a further post.




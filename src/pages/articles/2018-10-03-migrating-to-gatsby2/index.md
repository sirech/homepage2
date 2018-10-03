---
title: Migrating to Gatsby 2
date: "2018-10-03"
layout: post
path: "/migrating-to-gatsby2/"
categories:
  - React
  - Gatsby
draft: false
---

I have been using [Gatsby](https://www.gatsbyjs.org/) for about 6 months, and I am quite [happy with it](../migrating-to-gatsby).

Recently _Version 2_ was [released](https://www.gatsbyjs.org/blog/2018-09-17-gatsby-v2/). It has quite a few improvements. It is faster, smaller, and it brings major library updates:

- React 16.5
- Webpack 4
- [Babel 7](https://babeljs.io/)

The official documentation has a [comprehensive migration guide](https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/), which is what I followed. I had to spend some extra effort to get everything running again, though.

<!--more-->

## Removing old plugins

I had some plugins that either stopped working or that I actually did not use at all, so I did some cleanup. `gatsby-plugin-manifest`, `gatsby-plugin-google-analytics`, `gatsby-plugin-react-next` are out. Conversely, I added `gatsby-plugin-layout`, as _Gatsby 2_ has changed how the main layout works, and I did not want to change too much at once.

## Missing favicon

I had my _favicon_ under _static/img_, which stopped working. Instead I went with another plugin [gatsby-plugin-favicon](https://github.com/Creatiwity/gatsby-plugin-favicon), which works basically out of the box.

## Global styles

I mostly use [CSS Modules](https://github.com/css-modules/css-modules) for styling, but I have some global styles that I use for convenience and to style [emergence](https://github.com/xtianmiller/emergence.js/blob/master/README.md). It seems that _Gatsby 2_ is stricter about how assets are imported, as these stylings were not being applied anymore. I had to extract them from a component to a proper [global file](https://github.com/sirech/homepage2/blob/master/src/layouts/globals.scss).

## Babel 7 and Jest

_Babel 7_ and _Jest_ do not play nice with each other, as [many](https://www.google.de/search?q=jest+babel+7&oq=jest+babel+7&aqs=chrome..69i57j69i60l3j0l2.3871j0j7&sourceid=chrome&ie=UTF-8) resources illustrate. Getting this to work without breaking the normal compilation process took me some time to figure out. In the end I am doing it through the _Jest_ configuration.

```javascript
module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '^.*\\.s?css$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': './jest/transformer.js',
  },
  setupFiles: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.cache/'],
  globals: {
    __PATH_PREFIX__: '',
  },
}
```

I am using a custom transformer that applies the new _Babel_ presets, like this:

```javascript
const config = {
  babelrc: false,
  presets: ['@babel/preset-env', '@babel/preset-react'],
}

module.exports = require('babel-jest').createTransformer(config)
```

I ended up having to install some extra dependencies:

```
yarn add --dev babel-jest babel-core@^7.0.0-bridge.0 @babel/core regenerator-runtime
```

This made it work although it is a bit fragile. Trying to stop using `graphql` as a global gave me a lot of errors, for instance.

## Up and running

And that is basically it, now the whole site runs on the most modern version of most packages, which is great. I am looking forward to use some of the new _fancy_ features at some point.







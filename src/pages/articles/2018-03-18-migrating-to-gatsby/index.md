---
title: Migrating to Gatsby
date: "2018-03-18"
layout: post
path: "/migrating-to-gatsby/"
categories:
  - React
  - Gatsby
draft: false
description: "It all starts here. After using Create React App for a while, I decided to switch to Gatsby for my personal website"
---

Some months ago, I decided to rewrite my website using [React](https://reactjs.org/), to experiment with a bunch of new features of _React_ that I wanted to use at work. To spare myself the trouble of bootstrapping the whole thing, I used the awesome [Create React App](https://github.com/facebook/create-react-app) from _Facebook_.

Lately I have been working with a lot of different technologies and setups, and I wanted to get into the habit of writing about it a bit more, if only for my own amusement. I have been looking for a super simple way to publish _Markdown_ files that I could host myself. After looking a bit around, it seemed to me that _CRA_ was not going to provide that unless I built a significant part of it myself.

Then I stumbled across [Gatsby](https://www.gatsbyjs.org/). I was not keen to spend a lot of time doing plumbing and configuration, but _Gatsby_ offered a lot of useful features, and seemed to be a very convenient way to set up a simple blog while keeping _React_ pages. I went with [this bootrapper](https://github.com/jaxx2104/gatsby-starter-bootstrap), as it came with _Bootstrap 4_, which is what I have been using for my personal projects lately.

There are basically endless possibilities to customize _Gatsby_, and plenty of resources on the internet to get inspiration from as well. There were a few areas where I couldn't find much help, though, so I wrote down some thoughts about how to get things like testing, dockerizing or a CI/CD pipeline.

<!--more-->

## Testing

The initial distribution does not come with any setup infrastructure. For building static pages testing is not as important as in other cases, but I still want some simple sanity tests to make sure my components are not blowing up. [This Gist](https://gist.github.com/m-allanson/3dd343db56951ba852fd09a7e52d6a89) helped me get in the right direction to do a minimal setup for [Jest](https://facebook.github.io/jest/), which is my goto framework for testing _React_ apps.

For my components I am not really interested in snapshot tests (I feel visual inspection is enough to check the layout), so I went with [Enzyme](https://github.com/airbnb/enzyme) instead, to do a shallow render of every component. I added this `setupTests.js` file:

```js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

// a global graphql is expected by gatsby
global.graphql = () => ''
```

All my tests are very similar, just a quick check that the component renders. An example would be:

```js
import React from 'react'
import { shallow } from 'enzyme'
import Talks from './index'

describe('components', () => {
  describe('Talks', () => {
    it('renders correctly', () => {
      const component = shallow(<Talks />)
      expect(component).toHaveLength(1)
    })
  })
})
```

## Dockerizing the app

Since quite some time, I tend to use [Docker](https://www.docker.com/) to package all my applications. I love having a unified way to build artifacts that can be dealt in an unified manner, regardless of technology. Following [the best practices](http://heiber.im/post/creating-a-solid-docker-base-image/) from a colleague from work, I set out to containerize my freshly built website, which turned out to be much harder than I thought.

My use case for _Docker_ in this case is a bit forced, as I am not really running anything inside the container. Instead, I am using it to compile the repo to a bunch of html, css and js files, which I extract from the container so that it can be served by [nginx](https://www.nginx.com/). Nevertheless, I still want to use a good quality image for that.

My problems with _Gatsby_ were mostly related to image plugins. There is `sharp` and some others that needed `libpng` among others. After much fighting and cursing, I shamefully gave up on using _alpine_ to build the code and switched instead to a _slim_ image, which bloated the size of the container quite a lot. Here is how it looks like

```docker
FROM node:9.8.0-slim as builder

WORKDIR /app

ARG SITE_URL=''

COPY . .

RUN apt-get update \
    && apt-get install -y build-essential libpng-dev zlib1g-dev \
    && yarn \
    && yarn run build \
    && yarn cache clean \
    && find public -regextype posix-basic -regex '.*\.\(js\|css\)\(.map\)\?$' | xargs -I@ sh -c "gzip -c @ > @.gz" \
    && rm -Rf node_modules \
    && apt-get remove -y build-essential libpng-dev zlib1g-dev \
    && apt-get clean

FROM alpine:3.7

WORKDIR /app

COPY --from=builder /app/public build

CMD cp -a build/* public/ && echo 'Build done'
```

I am using a [Multi Stage build for docker](https://docs.docker.com/develop/develop-images/multistage-build/). That way, even if the building takes quite a lot of space, the resulting image is very small, and it can be published easily. I really like using this feature to get the smallest possible images.

## CI/CD Pipeline

Writing a pipeline for a hobby project like this is a complete overkill, but I still wanted to get it automatically deployed after each commit while doing a bunch of quality checks before. I host it on [Travis](https://travis-ci.org/), which is awesome for this kind of projects.

My pipeline is relatively standard, which a bunch of steps to ensure that it works, plus packaging it and deploying it after that:

```yaml
stages:
  - lint
  - test
  - security
  - name: docker
    if: branch = master
  - name: deploy
    if: branch = master
```

The steps are implemented using `npm` scripts. I included some security checks using [Hawkeye](https://github.com/Stono/hawkeye) because it is super easy to do and that gives me a bit of peace of mind.

## Summary

It took me some effort to understand and deploy to my server, but I am pretty pleased with the result, which is [on Github](https://github.com/sirech/homepage2). It is quite easy to set up, and pretty flexible to modify to your own liking. The only thing I didn't manage to do was to leverage [Reactstrap](https://reactstrap.github.io/) to get Bootstrap aware React components. As I understood it is related to [this issue](https://github.com/gatsbyjs/gatsby/issues/2714), which will get hopefully fixed sometime soon.

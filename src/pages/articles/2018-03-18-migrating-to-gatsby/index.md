---
title: Migrating to Gatsby
date: "2018-03-18"
layout: post
path: "/migrating-to-gatsby"
categories:
  - React
  - Gatsby
---

Some months ago, I decided to rewrite my website using [React](https://reactjs.org/), to experiment with a bunch of new features of _React_ that I wanted to use at work. To spare myself the trouble of bootstrapping the whole thing, I used the awesome [Create React App](https://github.com/facebook/create-react-app) from _Facebook_.

Lately I have been wanting to write a bit about things that I am doing. I wanted a super simple way to publish _Markdown_ files that I could host myself. After looking a bit around, it seemed that _CRA_ was not going to provide that unless I built a significant part of it myself.

Then I stumbled across [Gatsby](https://www.gatsbyjs.org/). I was not keen to spend a lot of time doing plumbing and configuration, but _Gatsby_ offered a lot of useful features, and seemed to be a very convenient way to set up a simple blog while keeping _React_ pages. I went with [this bootrapper](https://github.com/jaxx2104/gatsby-starter-bootstrap), as it came with _Bootstrap 4_, which is what I have been using for my personal projects lately.

<!--more-->

## Dockerizing the app

Since quite some time, I tend to use [Docker](https://www.docker.com/) to package all my applications. I love having a unified way to build artifacts that can be dealt in an unified manner, regardless of technology. Following [the best practices](http://heiber.im/post/creating-a-solid-docker-base-image/) from a colleague from work, I set out to containerize my freshly built website, which turned out to be much harder than I thought.

My use case for _Docker_ in this case is a bit forced, as I am not running anything from the container. Instead, I am using it to compile the repo to a bunch of html, css and js, which I extract from the container so that it can be served by [nginx](https://www.nginx.com/). Nevertheless, I still want to use a good quality image for that.

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

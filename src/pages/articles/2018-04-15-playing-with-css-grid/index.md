---
title: Playing with CSS Grid
date: "2018-04-15"
layout: post
path: "/playing-with-css-grid/"
categories:
  - CSS
  - CSS Grid
draft: true
---

I heard about the _CSS Grid_ layout for the first time at the [Full Stack Fest 2016](https://2016.fullstackfest.com/), in a talk from [Jen Kramer](http://www.jenkramer.org/). I remember thinking at the time that it was a cool idea. However, it seemed that the support was just not there and thus we had to remain with classical grids.

In the meantime, grids have been slowly moving to flexboxes, like [Bootstrap](https://getbootstrap.com/). So that's progress, I guess. I am always surprised to find an internal self written grid implementation in most projects I have taken part. I guess people just get attached to their grids.

Anyways, it seems that the support has getting lately to a point where it is becoming viable to build layouts with them. It is even featured on ThoughtWorks's [radar](https://www.thoughtworks.com/radar/languages-and-frameworks/css-grid-layout). According to [caniuse](https://caniuse.com/#feat=css-grid), if you support Edge and upwards you are actually good to go.

## Learning the grid

In order to get a better feeling I had a look at some very good guides:

- https://css-tricks.com/snippets/css/complete-guide-grid/
- https://developers.google.com/web/updates/2017/01/css-grid

It feels a bit like when I learnt about _flexboxes_ for the first time. There are a lot of options and complexity, but I get the impression that once you get used to it you will use it everywhere. So maybe we will finally get rid of all the rows and columns we have building for the last years.

I have built some small examples to showcase what you can do with it.


## Resources

There are a bunch of very useful guides to understand the _CSS Grid_ layout. Here are some:

## _Example 1_: Main Structure

<iframe height='445' scrolling='no' title='Main + Sidebar layout' src='//codepen.io/sirech/embed/wmLbby/?height=365&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sirech/pen/wmLbby/'>Main + Sidebar layout</a> by Mario Fernández (<a href='https://codepen.io/sirech'>@sirech</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Most websites follow a similar structure, with a main content, and then maybe a navigation bar and a sidebar. With the _CSS Grid_ you can build this in a very flexible way, and adapt it for mobile by using media queries.

## _Example 2_: Matrix

The problem with flexboxes is that they only allow you to control the flow in one direction. Sometimes you want to build components that are more complex like that, like an image gallery. Let's say you want to build a grid and position pictures of different sizes there.

<iframe height='445' scrolling='no' title='3 by 3 Grid' src='//codepen.io/sirech/embed/mxZYQR/?height=438&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sirech/pen/mxZYQR/'>3 by 3 Grid</a> by Mario Fernández (<a href='https://codepen.io/sirech'>@sirech</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

That is a 3x3 grid with pictures of different sizes that are aligned automatically. You can do this with a normal grid, but it requires _a lot_ of markup. And that is without getting into customizing the size of some of the columns and rows, or letting them grow or shrink.




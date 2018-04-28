---
title: Playing with CSS Grid
date: "2018-04-28"
layout: post
path: "/playing-with-css-grid/"
categories:
  - CSS
  - CSS Grid
draft: false
---

I heard about the _CSS Grid_ layout for the first time at the [Full Stack Fest 2016](https://2016.fullstackfest.com/), in a talk from [Jen Kramer](http://www.jenkramer.org/). I remember thinking at the time that it was a cool idea. However, it seemed that the support was just not there and thus we had to remain with classical grids.

In the meantime, grids have been slowly moving from floats to _flexboxes_, like [Bootstrap](https://getbootstrap.com/). So that's progress, I guess. I am always surprised to find a self written grid implementation whenever I join a new project. That has happened to me a bunch of times already. I guess people just get attached to their grids.

Anyways, it seems that the support has getting lately to a point where it is becoming viable to build layouts with them. It is even featured on [ThoughtWorks's radar](https://www.thoughtworks.com/radar/languages-and-frameworks/css-grid-layout). According to [caniuse](https://caniuse.com/#feat=css-grid), if you support _Edge_ and upwards you are actually good to go. _IE11_ only has partial support with prefixes, which might be an issue, though.

## Learning the grid

In order to get a better feeling I had a look at some very good guides:

- https://css-tricks.com/snippets/css/complete-guide-grid/
- https://developers.google.com/web/updates/2017/01/css-grid

It feels a bit like when I learnt about _flexboxes_ for the first time. There are a lot of options and complexity, but I get the impression that once you get used to it you will use it everywhere. So maybe we will finally get rid of all the rows and columns we have building for the last years.

I have built some small examples to showcase what you can do with it.

<!--more-->

## _Example 1_: Main Structure

<iframe height='445' scrolling='no' title='Main + Sidebar layout' src='//codepen.io/sirech/embed/wmLbby/?height=365&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sirech/pen/wmLbby/'>Main + Sidebar layout</a> by Mario Fernández (<a href='https://codepen.io/sirech'>@sirech</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Most websites follow a similar structure, with a main content, and then maybe a navigation bar and a sidebar. With the _CSS Grid_ you can build this in a very flexible way, and adapt it for mobile by using media queries. What I love the most about this is that you can do it with a very compact and semantic html layout. If you use somethhing like _Bootstrap_, the same layout as above could look like this:

```html
<div class="container-fluid">
  <div class="row">
    <div class="col">
      <nav>
        <h2>Navigation</h2>
      </nav>
    </div>
  </div>
  
  <div class="row">
    <div class="col-12 col-sm-9">
      <main>
        <h2> Main content</h2>
      </main>
    </div>
    <div class="col-12 col-sm-3">
      <aside>
        <h2>Sidebar</h2>
      </aside>
    </div>
  </div>
</div>
```

That is a lot of nesting for such a simple thing. Also, if you want to do something about the height, you need to do it on your own. I like the pure grid solution so much better. One thing that I never liked about traditional grids is the amount of negative margins and paddings that are used to build the gutters between the columns (I just remember how hard was to have a full width image across a row). Instead, just using `grid-gap` makes everything much easier.

## _Example 2_: Matrix

The problem with flexboxes is that they only allow you to control the flow in one direction. Sometimes you want to build components that are more complex like that, like an image gallery. Let's say you want to build a grid and position pictures of different sizes there.

<iframe height='445' scrolling='no' title='3 by 3 Grid' src='//codepen.io/sirech/embed/mxZYQR/?height=438&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sirech/pen/mxZYQR/'>3 by 3 Grid</a> by Mario Fernández (<a href='https://codepen.io/sirech'>@sirech</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

That is a 3x3 grid with pictures of different sizes that are aligned automatically. Another cool feature that gives you a lot of flexibility is that you can have elements span multiple rows or columns.

## _Example 3_: Alignment

_CSS Grid_ is quite flexible regarding alignments. It supports many of the properties that a flexbox supports, such as `justify-items`, `align-items`, `justify-content` and `align-content` for the main container, or the equivalent ones for single items.

<iframe height='445 scrolling='no' title='CSS Grid Alignment' src='//codepen.io/sirech/embed/aGpvWg/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sirech/pen/aGpvWg/'>CSS Grid Alignment</a> by Mario Fernández (<a href='https://codepen.io/sirech'>@sirech</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Gimme the Grid!

This looks awesome. _CSS Grid_ allows you to build layouts in a way that feels much more natural than what we have been doing until now, and opens up a lot of new possibilities to control the height of your elements, which is something you could not easily do before. Not only that, but it synergizes very well with flexboxes. You can build the main page structure with a grid, and then style the single elements with flexboxes, while using a very consistent set of attributes. This definitely feels like the future of building high quality pages.



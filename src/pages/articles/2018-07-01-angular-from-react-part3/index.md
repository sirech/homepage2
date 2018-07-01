---
title: Angular from the perspective of a React fan - Part 3
date: "2018-07-01"
layout: post
path: "/angular-from-react-part3/"
categories:
  - JavaScript
  - React
  - Angular
  - TypeScript
  - angular-cli
  - redux
draft: true
---

<div class="guide">

### Angular Series

- [Part 1 - Bootstrapping and TypeScript](../angular-from-react-part1/)
- [Part 2 - Testing](../angular-from-react-part2/)
- [**Part 3 - State Management**](../angular-from-react-part3/)

</div>

When building a complex application, it is really important to think about how the data flows inside it. I remember, back in the [jQuery](https://jquery.com/) days, having code that would modify multiple unrelated parts of the page. It is a good thing we did not do a lot of unit testing back then, because that code was basically impossible to test.

Still suffering PTSD from that, I instantly became a fan of [redux](https://redux.js.org/), once I actually manage to understand how it works. Anyways, the [unidirectional flow pattern](https://redux.js.org/basics/data-flow) is a very good way to alter the state of an application in a predictable way.

_Angular_ has a bunch of different options to handle state in its components. The project I am working on did not have somebody with a lot of experience in the matter, so I have seen many attempts to do this. Some of them failed quite spectacularly at making our life easier. I am still looking for a good way of treating state in _Angular_, but at least I have learned a couple of lessons the hard way, that I want to share.

<!--more-->

## Input/Output

[Input/Output](https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding) is basically the equivalent of [props in React](https://reactjs.org/docs/components-and-props.html). The state is not kept in the component, but injected from the outside. Whenever the component needs to trigger a notification, an _Output_ can be used with a callback. 

This is a fine way to manage state and create mostly components that are representational and don't manage their own state. It has one drawback, shared with _props_, which is that if your component hierarchy is very deep you can end up having a lot of components passing data and callbacks up and down, even if there are not using it themselves.

I really like seeing small and simple components where you instantly understand what data is needed, and which actions are being triggered from it.

```javascript
class SimpleComponent {
  @Input() selectedDate: Date;
  @Output() onJump = new EventEmitter<Date>();

  jumpBack(date: Date) {
    this.onJumpto.emit(date);
  }
}
```

## ViewChild

A [ViewChild](https://angular.io/api/core/ViewChild) gives a reference to a child component to a parent component, which allows it to break every rule in unidirectional flow and call methods directly. It is extremely easy to misue it to build a web of deeply connected components that you will never be able to refactor. You can do something like this

```javascript
// Bad idea
class Evil {
  @ViewChild(PoorChildrenComponent)
  sayGoodbyeToEncapsulation: PoorChildrenComponent; 

  ngOnInit() {
    this.sayGoodbyeToEncapsulation.changeStuffExternally();
  }
}
```

I am sure there is a reason for this feature, and a proper way to use it, but I have seen it mostly to tightly couple components together.

## Nested Forms

Another way to create a somewhat hidden connection between components are [nested forms](https://angular.io/guide/reactive-forms). The idea for nesting forms as far as I understand it is to combine multiple forms across different components into one form that can be validated and submitted as a unit. That sounds good. However, without discipline you can do things like change the values of the form from very far away.

In fact I saw this leading to some lost updates, which ended up being solved by plastering the code with `detectChanges`.

## Data Services

## ngrx

## Conclusion

State management in _Angular_ can be quite tricky. 





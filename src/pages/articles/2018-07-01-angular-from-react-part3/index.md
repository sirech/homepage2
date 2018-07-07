---
title: Angular from the perspective of a React fan - Part 3
date: "2018-07-07"
layout: post
path: "/angular-from-react-part3/"
categories:
  - JavaScript
  - React
  - Angular
  - TypeScript
  - angular-cli
  - redux
draft: false
---

<div class="guide">

### Angular Series

- [Part 1 - Bootstrapping and TypeScript](../angular-from-react-part1/)
- [Part 2 - Testing](../angular-from-react-part2/)
- [**Part 3 - State Management**](../angular-from-react-part3/)

</div>

When building a complex application, it is really important to think about how the data flows through it. I remember, back in the [jQuery](https://jquery.com/) days, having code that would modify multiple unrelated parts of the page. It is a good thing we did not do a lot of unit testing back then, because that code was basically impossible to test.

Still suffering PTSD from that, I instantly became a fan of [redux](https://redux.js.org/), once I actually manage to understand how it works. Anyways, the [unidirectional flow pattern](https://redux.js.org/basics/data-flow) is a very good way to alter the state of an application in a predictable way.

_Angular_ has a bunch of different options to handle state. The project I am working on did not have somebody with a lot of experience in the matter when it was being set up, so I have seen many attempts to do this, stored in its history. Some of them failed quite spectacularly at making our life easier. I am still looking for a good way of treating state in _Angular_, but at least I have learned a couple of lessons (the hard way) that I want to share. This are some examples of ways of modeling state in _Angular_ that I have seen and used.

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

Now, the state has to be managed *somewhere*. At least one component needs to take on that responsibility. But if most components do not need to care about state, it becomes a lot easier to reason about them, and to, dare I say, **reuse** them.

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

I am sure there is a reason for this feature, and a proper way to use it, but I have seen it mostly to tightly couple components together. Until I see a compelling reason to use this feature that does not lead to broken designs, I do not see a place for this feature outside of component tests.

## Nested Forms

Another way to create a somewhat hidden connection between components are [nested forms](https://angular.io/guide/reactive-forms). The idea for nesting forms as far as I understand it is to combine multiple forms across different components into one form that can be validated and submitted as a unit. That sure sounds good. However, without discipline you can do things like change the values of the form from very far away.

In fact, using this pattern without really thinking about how the state is updated led to some lost updates, which ended up being solved by plastering the code with `detectChanges`. Debugging that problem was no fun at all.

## Data Services

[Communication through data services](https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service) seems to be a pretty accepted practice in the _Angular_ community. The gist of it is to define a service that belongs to a component up in the hierarchy, which is made available to the children without creating new instances. The service provides a number of methods to alter the state in a well defined way. Updates are fetched through [observables](https://angular.io/guide/observables). This has a bunch of advantages:

- The logic to alter state is gathered in one place, outside of any component.
- The state can be only modified through this API, which makes it easier to control and understand changes.
- Anybody which is interested in getting updates regarding a certain subject can just subscribe to an observable. This decouples the actions from the reactions.

A simple service could look like this:

```javascript
@Injectable()
export class TimeStore {

  private timeslotSubject = new BehaviorSubject<Date>(null);
  timeslot$ = this.timeslotSubject.asObservable();

  selectTimeslot(timeslot: Date) {
    this.timeslotSubject.next(timeslot);
  }
}
```

This is the most satisfying way of dealing with state I have found in _Angular_ thus far. It allows you to decouple things pretty nicely, and it scales quite well if the number of components that are interested in certain updates increases. It is not [without caveats](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/), though. It tends to require a lot of boilerplate as well. But then again, _Angular_ seems to require a lot of boilerplate code in general.

Another important thing to remember is that you really have to avoid creating services without a good API, or even worse, with just some public fields. Otherwise you just created a semi-global mutable shared state. At that point, we might as well just define things in the global namespace (avoid that).

## ngrx store

[ngrx store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) is the _Angular_ equivalent to _redux_. Unlike the _React_ community, it does not seem to be as an accepted as a state management solution, at least according to other developers I have talked with. I have not managed to use it for any real code thus far, although it decidedly looks like _redux_, maybe a bit more verbose. It has the same problem as _redux_, though: It is not easy to grasp as first. Introducing it to an inexperienced team can lead to a lot of blank looks.

## Conclusion

My conclusion is that I do not have a conclusion. How do you deal with state in _Angular_? I do not feel a lot wiser now that some months ago. I have seen a lot of things I do not want to do, but it is not like I can offer a solid overarching strategy. My **TL;DR**  would be use _Data Services_, and hope for the best.

These are my main points with _Angular_ for now. I think I have other small points that I might compile into another entry, maybe.





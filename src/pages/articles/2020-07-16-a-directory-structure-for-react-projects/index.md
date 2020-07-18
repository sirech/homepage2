---
title: A directory structure for React projects
date: "2020-07-19"
layout: post
path: "/a-directory-structure-for-react-projects/"
categories:
  - React
  - TypeScript
  - Code Organization
draft: false
description: "How do you structure your components in a React application? I like to group mine around features close to the domain enforced by convention"
image: ./images/react-folders.png
---

<figure class="figure figure--left">
  <img src="./images/react-folders.png" alt="React folders" />
</figure>

I've answered a variation of the question "How do you organize your components in a _React_ project?" a few times in our internal mailing lists over the last months. I wanted to share the structure that I have been using in my last projects.

I have a [small project](https://github.com/sirech/cookery2-frontend) that serves as an example. It is based around two simple concepts:

- Folders are Features
- Using `index.ts` to differentiate between public and private components.

## Folders are features

I used to call this _structuring components vertically_, but this name is more catchy! The idea is to move away from a functional structure, where you have things like `controllers`, `models`, or `services`. Instead, you group your code around features. A folder contains all that is needed to understand a particular feature in your app. The code maps the domain more closely. If you like [domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design), that should be music to your ears.

Let's have a look at one example. I have a view to show the details of a recipe, including the ingredients, and a list of steps. The data is fetched from the backend through a service. The page roughly looks like this:

<figure class="figure">
  <img src="./images/recipe-details.png" alt="Recipe details" />
</figure>

In my code, I will group the whole feature in one folder, this way:

<!-- recipe-details -->
```console
recipe-details
├── Ingredients.tsx
├── RecipeDetails.test.tsx
├── RecipeDetails.tsx
├── Steps.tsx
├── __mocks__
│   └── recipeDetails.service.ts
├── index.ts
└── recipeDetails.service.ts
```

The main component is `RecipeDetails`. There are other smaller components, `Ingredients` and `Steps`. There is a service that talks to an API, some tests, and mocks. By looking at this folder, I'm able to understand this feature without having to comb through multiple parts of my application.

### Scaling it up

As your application gets more complex, these folders might grow to a point where there are too many files in one folder. Extracting components helps to keep them small.

Another optimization we did in one project was to introduce the concept of `pages`. A page is just like a feature but is associated with a URL. Having your code broken down in pages aligns well with how users see your app, and it lends itself to code splitting down the line.

## Use index.ts to differentiate between public and private components 

With _TypeScript_, you don't have a way to group code in packages like you could do in something like _Kotlin_. You can simulate it with folders, though. I like to use the `index.ts` for a folder as an entry point. You can only import components from the outside **if** they are exported there. Coming back to our `recipe-details`, the only component I want to export is `RecipeDetails`, so my `index.ts` looks like this:

<!-- index.ts -->
```typescript
export { default } from './RecipeDetails'
```

which I import from the main `App.tsx` like this:

<!-- import -->
```typescript
import RecipeDetails from 'recipe-details'
```

This convention is enforced with [eslint](https://eslint.org/), with the help of the [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md) plugin. It is not a proper package system, but it works pretty well in practice.

Both `Ingredients` and `Steps` are private components. They are intended to be used only in the context of this folder to make sure that all the components remain small. They don't have dedicated tests but are rather tested as part of the whole feature following the principles of [React Testing Library](https://github.com/testing-library/react-testing-library).

### Use absolute imports for public components

It just makes refactorings a lot easier. 

```typescript
import Navigation from 'navigation'
```

It is done with a small adjustment in the `tsconfig.json`:

```json
{
  "include": ["src"]
}
```

## Generic components under `components`

Beware of over-abstraction! Don't try to create components that are too generic. It will end up bringing more complexity. If you do in fact have some components that can be reused, I like to put them in a `components` folder:

```console
components
├── adapter-link
│   ├── AdapterLink.tsx
│   └── index.ts
└── recipe
    ├── Recipe.test.tsx
    ├── Recipe.tsx
    ├── index.ts
    └── types.ts
```

## Don't be afraid to tinker

Nothing is set in stone. Keep the components small. Don't let folders get too big. Group them when it makes sense. And give [Effective TypeScript](../book-review-effective-typescript/) a read, it's a really good book.

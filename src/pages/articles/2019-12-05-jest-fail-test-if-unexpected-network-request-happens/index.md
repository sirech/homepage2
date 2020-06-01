---
title: Fail a test in Jest if an unexpected network request happens
date: "2019-12-08"
layout: post
path: "/jest-fail-test-if-unexpected-network-request-happens/"
categories:
  - React
  - Jest
  - Testing
  - react-testing-library
  - create-react-app
  - axios
draft: false
description: "Automatically failing unit tests with Jest in React when network requests are made will make your tests more reliable and easier to maintain"
image: ./images/jest.png

---

A [unit test](https://martinfowler.com/bliki/UnitTest.html) should not trigger network requests, such as calls to a REST API. It breaks the isolation and will make the tests flaky and unreliable.

Instead, we should be mocking these requests. [React](https://reactjs.org/) and [Jest](https://jestjs.io/) provide a convenient way of doing so. What if you forget to mock some requests, though? We are going to set up _Jest_ in such a way that tests fail automatically if a network request was attempted.

<figure class="figure">
  <img src="./images/jest.png" alt="Test it like you mean it" />
</figure>

<!--more-->

I have been using [react-testing-library](https://testing-library.com/) a lot lately to test _React_ applications. Its core design principle is described like this:

> The more your tests resemble the way your software is used,
the more confidence they can give you.

This is a good thing! In my experience, you write stronger tests once you get used to it. However, if you use this library you probably have seen this error message multiple times:

```shell
1: "Warning: An update to %s inside a test was not wrapped in act(...).·
When testing, code that causes React state updates should be wrapped into act(...):·
act(() => {
  /* fire events that update state */
});
```

It usually means that there were pending asynchronous requests when the test finished.

## Our first attempt at catching errors

We have this starting configuration in the `setupTests.js` that is loaded automatically if you are using [Create React App](https://create-react-app.dev/). It is pretty standard.

```javascript
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'

console.error = jest.fn()

afterEach(() => {
  expect(console.error).not.toHaveBeenCalled()
})
afterEach(cleanup)
```

It is very useful to fail on `console.error`, because that will show that there were pending requests. However, that output can be fairly confusing. We had a test in my project that was failing because we added a new section to a component. It wasn't obvious that the new section was fetching data from an endpoint. We ended up "fixing" it by adding `await wait()` statements all over the place. 

That didn't address the underlying issue, though. I had to spend quite a bit of time digging into it before I figured out what was going on. We want clearer feedback.

## A more targeted approach

We use [axios](https://github.com/axios/axios) to build our API requests. *Any* test that does a request that is not mocked should fail. It still should be possible to add explicit mocks for things like service tests as well. We also use [pact](https://pact.io/) for _Contract Testing_. These tests go against a local server, no mock should be active when they run. I extended the `setupTests.js` file to mock `axios`.

```javascript
import axios from 'axios'

const spies = {
  get: jest.spyOn(axios, 'get'),
  patch: jest.spyOn(axios, 'patch'),
  post: jest.spyOn(axios, 'post')
}

beforeEach(() => {
  jest.resetAllMocks()
})

afterEach(() => {
  expect(spies.get).not.toHaveBeenCalled()
  expect(spies.patch).not.toHaveBeenCalled()
  expect(spies.post).not.toHaveBeenCalled()
})
```

That's it. With this, any attempt at doing an unexpected request will trigger a nice and explicit failed assertion. We still need to deal with *expected* requests.

### Mocking services

This setup does not define any return for the requests. You need to take care of that if you are building integrated tests for your components.

I tend to deal with that at the service level. My requests are usually encapsulated in a file that gets imported by the components that need them. I use Jest's [manual mocks](https://jestjs.io/docs/en/manual-mocks) for that, which sit one level higher than `axios`. A service could be as simple as this:

```typescript
// src/recipe-list/recipeList.service.ts
import axios, { AxiosResponse } from 'axios'
import { Recipe } from 'components/recipe/types'

export const recipeList = async (): Promise<AxiosResponse<Recipe[]>> => {
  return axios('/rest/recipes')
}
```

Which can be replaced with a manual mock like this:

```typescript
// src/recipe-list/__mocks__/recipeList.service.ts
import { AxiosResponse } from 'axios'
import { recipes } from '@testing/__fixtures__'
import { Recipe } from 'components/recipe/types'

export const recipeList = async (): Promise<AxiosResponse<Recipe[]>> => {
  return Promise.resolve({
    status: 200,
    statusText: 'OK',
    data: recipes(),
    headers: [],
    config: {}
  })
}
```

### Mocking axios directly

Another alternative is to mock _axios_ directly and add your behavior, which will replace the mock that we defined initially.

```typescript
jest.mock('axios')

describe('service', () => {
  beforeEach(() => {
    ;(axios.get as jest.Mock).mockResolvedValue(response)
  })
})
```

### Resetting the mocks

If you need `axios` to work normally, like in the case of Contract Tests, you can restore the original behavior.

```typescript
beforeAll(() => {
  jest.restoreAllMocks()
})
```

## Summary: Make your errors explicit

That all there is to it. A simple solution, if a bit hacky, to make sure that errors surface as quickly as possible and don't get hidden.

*EDIT 25/12/2019:* Grammar review
*EDIT 15/04/2020:* Fix broken code snippet

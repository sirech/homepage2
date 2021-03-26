---
title: Custom Components in Formik
date: "2019-08-15"
layout: post
path: "/custom-components-in-formik/"
categories:
  - React
  - Formik
  - react-hooks
related:
  - /a-directory-structure-for-react-projects/
  - /jest-fail-test-if-unexpected-network-request-happens/
  - /book-review-effective-typescript/
draft: false
description: "Formik is the new cool kid on the block for forms in react. Here is how to build custom input elements on top"
image: ./images/react.png

---

<figure class="figure figure--right">
  <img src="./images/react.png" alt="React is like Angular, but totally different" />
</figure>

Forms and [React](https://reactjs.org/). Don't they go well together? If you are doing any serious _React_ development, you will build sooner or later a complex form. The temptation to roll your own homemade framework can arise, but you have to fight it. There are plenty of good existing solutions to pick.

You might choose [Formik](https://jaredpalmer.com/formik/) for the task. In that case, I want to show you how to build a custom input component for it.

<!--more-->

## Wait, Formik?

_Formik_ is the new [cool kid on the block](https://jaredpalmer.com/formik/). Quoting the official docs:

> Build forms in React, without the tears.

I certainly share the tears part. I used to build my forms with [redux](https://redux.js.org), using [react-redux-form](https://github.com/davidkpiano/react-redux-form). It is a fine library, don't get me wrong, but in the end there is a lot of friction connecting things together. Not to mention dealing with the state. Why, anyways? Looking back, having the state of my forms  in _Redux_ did not seem to help me that much.

_Formik_ takes a very different approach. It is declarative, relying on pure _React_. It uses [render props](https://reactjs.org/docs/render-props.html), a pattern that is spreading quickly across the _React_ ecosystem. Speaking of that, [this article](https://www.robinwieruch.de/react-render-props-pattern/) helped me finally understand them better.

Anyways, my impression thus far has been that _Formik_ stays out of the way and allows you to focus on building your forms.

## Customization

Regular `input` components, with a sprinkle of styling on top, will get you very far. They cover most typical use cases. But what if you want to spice it up?

For example, I have a small app where I want to give a star rating, from one to five. I implemented it first with a regular number input, which felt boring. I wanted to click on the stars, something like this:

<figure class="figure">
  <img src="./images/stars.png" alt="Everybody wants to be a star" />
  <figcaption class="figure__caption">
  Rate it!
  </figcaption>
</figure>

How does _Formik_ fare when building something like this? More after the break.

## Representational component

Before we get into the actual form stuff, let's build the `Stars` as a component for display. We are building a row of five stars. We have a prop (`count`) to set the number of stars that are set as full, and a handler (`handleClick`) to know when a particular star is clicked.

```jsx
const Stars = ({ count, handleClick }) => (
  <span className={styles.stars}>
    {[...Array(5).keys()].map(i => (
      <Star key={i} isFull={i < count} onClick={() => handleClick(i + 1)} />
    ))}
  </span>
);
```

The `Star` component is a thin wrapper around a [Font Awesome](https://fontawesome.com/) clickable icon.

## Custom input component

We are finally getting to the meaty part. How do we make the `Stars` component _Formik_ aware?

We will be rendering our `Stars` representational component inside a [Field](https://jaredpalmer.com/formik/docs/api/field). It uses render props as well, which we'll use to connect it to our `Stars`.

There is a `field` hash that contains the `value`, aka the number of set stars. That will be the input for `count`. To update the the value after a click on a star, we use the `setFieldValue` function inside the `form` hash. That will update the value internally on _Formik_.

```jsx
const fieldName = "stars";

const StarsInput = () => (
  <Field name={fieldName} id={fieldName} type="number">
    {({ field: { value }, form: { setFieldValue } }) => (
      <div>
        <label htmlFor={fieldName} className={"label-color"}>
          {fieldName}
        </label>
        <div>
          <Stars
            count={value}
            handleClick={number => setFieldValue(fieldName, number)}
          />
        </div>
      </div>
    )}
  </Field>
);
```

## Integrating it into a form

Now that we have our custom input component ready, we can render it inside a regular _Formik_ form, and we are all set:

```jsx
const MyForm = () => {
  return (
    <section>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ stars }}
      >
        {() => (
          <Form>
            <StarsInput />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
```

## Codesandbox

You can play with a working implementation of this in the sandbox below. Check it out and extend it to fit your needs.

<iframe src="https://codesandbox.io/embed/laughing-cookies-2t80u?fontsize=14" title="custom-formik-component" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


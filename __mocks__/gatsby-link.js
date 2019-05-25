import React from 'react'

export default jest.fn().mockImplementation(
  // these props are invalid for an `a` tag
  ({
    activeClassName,
    activeStyle,
    getProps,
    innerRef,
    ref,
    replace,
    to,
    ...rest
  }) =>
    React.createElement('a', {
      ...rest,
      href: to,
    })
)

import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { container } from './style.module.scss'

const Container = ({ className, children }) => (
  <div className={cx(container, className)}>{children}</div>
)

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

Container.defaultProps = {
  className: null,
}

export default Container

import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import styles from './style.module.scss'

const Container = ({ className, children }) => (
  <div className={cx(styles.container, className)}>{children}</div>
)

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

Container.defaultProps = {
  className: null,
}

export default Container

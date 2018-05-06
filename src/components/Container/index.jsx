import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './styles.module.css'

const Container = ({ children }) => (
  <div className={cx(styles.container)}>{children}</div>
)

Container.propTypes = {
  children: PropTypes.node,
}

export default Container

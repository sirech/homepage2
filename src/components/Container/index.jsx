import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.scss'

const Container = ({ children }) => (
  <div className={styles.container}>{children}</div>
)

Container.propTypes = {
  children: PropTypes.node,
}

export default Container

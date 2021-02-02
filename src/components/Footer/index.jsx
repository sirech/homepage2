import React from 'react'
import cx from 'classnames'

import styles from './style.module.scss'

const Footer = () => (
  <footer className={cx(styles.footer, 'text-center')}>
    <div>
      Copyright © {new Date().getFullYear()},{' '}
      <a
        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0
        International License.
      </a>
    </div>
    Favicon courtesy of{' '}
    <a href="https://icons8.com/" target="_blank" rel="noopener noreferrer">
      Icons8
    </a>{' '}
  </footer>
)

export default Footer

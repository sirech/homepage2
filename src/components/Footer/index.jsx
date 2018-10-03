import React from 'react'
import cx from 'classnames'

import styles from './style.module.scss'

export default () => (
  <footer className={cx(styles.footer, 'text-center')}>
    <div>
      Copyright © 2018,{' '}
      <a
        href="http://creativecommons.org/licenses/by/4.0/legalcode"
        target="_blank"
        rel="noopener noreferrer"
      >
        Licensed under CC-by-4.0
      </a>
    </div>
    Favicon courtesy of{' '}
    <a href="https://icons8.com/" target="_blank" rel="noopener noreferrer">
      Icons8
    </a>{' '}
  </footer>
)

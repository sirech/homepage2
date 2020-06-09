import React, { useEffect } from 'react'
import cx from 'classnames'

import Container from '../../components/Container'

import styles from './style.module.scss'

const Newsletter = () => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://hceris.ck.page/052ac9b9e2/index.js'
    script.setAttribute('data-uid', '052ac9b9e2')
    script.async = true

    const form = document.querySelector('[data-tag="newsletter"]')
    form.appendChild(script)
  }, [])

  return (
    <main>
      <Container>
        <div
          data-tag="newsletter"
          className={cx('horizontal-section', styles.newsletter)}
        />
      </Container>
    </main>
  )
}
export default Newsletter

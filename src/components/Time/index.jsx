import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.scss'

const Time = ({ date }) => (
  <time className={styles.time} dateTime={date}>
    {date}
  </time>
)

Time.propTypes = {
  date: PropTypes.string.isRequired,
}

export default Time

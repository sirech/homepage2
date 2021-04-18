import React from 'react'
import PropTypes from 'prop-types'

import { time } from './style.module.scss'

const Time = ({ date }) => (
  <time className={time} dateTime={date}>
    {date}
  </time>
)

Time.propTypes = {
  date: PropTypes.string.isRequired,
}

export default Time

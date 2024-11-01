import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { card } from './style.module.scss'

const Card = ({ tag = 'div', className = null, children }) => {
  const Tag = tag
  return <Tag className={cx(card, className)}>{children}</Tag>
}

Card.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Card

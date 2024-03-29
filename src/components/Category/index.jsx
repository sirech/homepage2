import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import cx from 'classnames'

import { tag } from './style.module.scss'

import formatTag from './format-tag'

const Category = ({ item, text }) => (
  <Link to={`/blog/tags/${formatTag(item)}`}>
    <span className={cx(tag, 'badge', 'me-2')}>{text}</span>
  </Link>
)

Category.propTypes = {
  item: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default Category

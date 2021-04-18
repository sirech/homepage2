import React from 'react'
import PropTypes from 'prop-types'

import Link from 'gatsby-link'
import cx from 'classnames'

import { tag } from './style.module.scss'

import formatTag from './format-tag'

const Category = ({ item, text }) => (
  <Link to={`/blog/tags/${formatTag(item)}`}>
    <span className={cx(tag, 'badge', 'mr-1')}>{text}</span>
  </Link>
)

Category.propTypes = {
  item: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

export default Category

import React from 'react'
import PropTypes from 'prop-types'
import { addIndex, map } from 'ramda'

import Link from 'gatsby-link'
import cx from 'classnames'

import styles from './style.module.scss'

import formatTag from './format-tag'

const Category = ({ item, text }) => (
  <Link to={`/blog/tags/${formatTag(item)}`}>
    <span className={cx(styles.tag, 'badge', 'mr-1')}>{text}</span>
  </Link>
)

Category.propTypes = {
  item: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

const renderCategories = (data) => {
  return addIndex(map)((item, i) => (
    <Category key={i} item={item} text={item} />
  ))(data)
}

const Categories = ({ categories }) => <>{renderCategories(categories)}</>

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default Categories

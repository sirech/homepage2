import React from 'react'
import PropTypes from 'prop-types'
import { addIndex, map } from 'ramda'

import Link from 'gatsby-link'
import cx from 'classnames'

import styles from './style.module.scss'

import formatTag from './format-tag'

const renderCategories = (data) => {
  return addIndex(map)((item, i) => (
    <Link to={`/blog/tags/${formatTag(item)}`} key={i}>
      <span className={cx(styles.tag, 'badge', 'mr-1')}>{item}</span>
    </Link>
  ))(data)
}

const Categories = ({ categories }) => <>{renderCategories(categories)}</>

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default Categories

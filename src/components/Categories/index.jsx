import React from 'react'
import PropTypes from 'prop-types'
import { addIndex, map } from 'ramda'

import Category from '../Category'

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

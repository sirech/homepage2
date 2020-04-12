import React from 'react'
import PropTypes from 'prop-types'
import { addIndex, map } from 'ramda'

const renderCategories = (data) => {
  return addIndex(map)((item, i) => (
    <span className="badge badge-primary text-white mr-1" key={i}>
      {item}
    </span>
  ))(data)
}

const Categories = ({ categories }) => <>{renderCategories(categories)}</>

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default Categories

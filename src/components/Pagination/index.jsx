import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Link from 'gatsby-link'
import { range } from 'ramda'

import Container from '../Container'

const url = index => (index === 1 ? '/blog/' : `/blog/${index}`)

const previousDisabled = index => index === 1
const nextDisabled = (index, pageCount) => index === pageCount

const previous = index => (
  <Link className="page-link" to={url(index - 1)}>
    <i className="fa fa-caret-left" />
  </Link>
)

const next = index => (
  <Link className="page-link" to={url(index + 1)}>
    <i className="fa fa-caret-right" />
  </Link>
)

const pages = (index, pageCount) =>
  range(1, pageCount + 1).map(pageNumber => (
    <li
      className={cx('page-item', { active: pageNumber === index })}
      key={pageNumber}
    >
      <Link className="page-link" to={url(pageNumber)}>
        {pageNumber}
      </Link>
    </li>
  ))

const Pagination = ({ index, pageCount }) => (
  <Container>
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        <li className={cx('page-item', { disabled: previousDisabled(index) })}>
          {previous(index)}
        </li>
        {pages(index, pageCount)}
        <li
          className={cx('page-item', {
            disabled: nextDisabled(index, pageCount),
          })}
        >
          {next(index)}
        </li>
      </ul>
    </nav>
  </Container>
)

Pagination.propTypes = {
  index: PropTypes.number,
  pageCount: PropTypes.number,
}

export default Pagination

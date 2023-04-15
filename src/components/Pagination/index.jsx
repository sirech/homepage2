import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'gatsby'
import { range } from 'ramda'

import Container from '../Container'

const url = (index, pathPrefix) =>
  index === 1 ? `/${pathPrefix}/` : `/${pathPrefix}/${index}`

const previousDisabled = (index) => index === 1
const nextDisabled = (index, pageCount) => index === pageCount

const previous = (index, pathPrefix) => (
  <Link className="page-link" to={url(index - 1, pathPrefix)}>
    <i className="fa fa-caret-left" />
  </Link>
)

const next = (index, pathPrefix) => (
  <Link className="page-link" to={url(index + 1, pathPrefix)}>
    <i className="fa fa-caret-right" />
  </Link>
)

const pages = (index, pageCount, pathPrefix) =>
  range(1, pageCount + 1).map((pageNumber) => (
    <li
      className={cx('page-item', { active: pageNumber === index })}
      key={pageNumber}
    >
      <Link className="page-link" to={url(pageNumber, pathPrefix)}>
        {pageNumber}
      </Link>
    </li>
  ))

const Pagination = ({ index, pageCount, pathPrefix }) => (
  <Container>
    <nav className="mt-4">
      {pageCount > 1 && (
        <ul className="pagination justify-content-center">
          <li
            className={cx('page-item', { disabled: previousDisabled(index) })}
          >
            {previous(index, pathPrefix)}
          </li>
          {pages(index, pageCount, pathPrefix)}
          <li
            className={cx('page-item', {
              disabled: nextDisabled(index, pageCount),
            })}
          >
            {next(index, pathPrefix)}
          </li>
        </ul>
      )}
    </nav>
  </Container>
)

Pagination.propTypes = {
  index: PropTypes.number,
  pageCount: PropTypes.number,
  pathPrefix: PropTypes.string,
}

export default Pagination

import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Link from 'gatsby-link'

import Container from '../Container'

const url = index => (index === 1 ? '/blog/' : `/blog/${index}`)

const previousDisabled = index => index === 1
const nextDisabled = (index, pageCount) => index === pageCount

const previous = index => (
  <Link className="page-link" to={url(index - 1)}>
    Back
  </Link>
)

const next = index => (
  <Link className="page-link" to={url(index + 1)}>
    Next
  </Link>
)

const Pagination = ({ index, pageCount }) => (
  <Container>
    <nav className="mt-4">
      <ul className="pagination justify-content-end">
        <li className={cx('page-item', { disabled: previousDisabled(index) })}>
          {previous(index)}
        </li>
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

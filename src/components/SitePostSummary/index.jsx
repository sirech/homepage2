import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { Link } from 'gatsby'

import Container from 'components/Container'
import Categories from 'components/Categories'
import Time from 'components/Time'

import { articles, article, articleBox } from './style.module.scss'

import frontmatterType from 'types/frontmatter'

const SitePostSummary = ({ data: { frontmatter } }) => {
  const { title, path, date, categories, description } = frontmatter

  return (
    <Container>
      <div className={cx(articles)}>
        <article key={path} className={cx(article, articleBox)}>
          <header>
            <Link to={path}>
              <h3>{title}</h3>
            </Link>
            <Time date={date} />
            <Categories categories={categories} />
          </header>
          <section>{description}</section>
        </article>
      </div>
    </Container>
  )
}

SitePostSummary.propTypes = {
  data: PropTypes.shape({
    frontmatter: frontmatterType,
  }).isRequired,
}

export default SitePostSummary

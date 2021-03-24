import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Link from 'gatsby-link'
import Container from '../Container'
import Categories from '../Categories'

import styles from './style.module.scss'

import frontmatterType from '../../prop-types/frontmatter'

class SitePostSummary extends React.Component {
  render() {
    const { data } = this.props
    const { frontmatter } = data
    const { title, path, date, categories, description } = frontmatter

    return (
      <Container>
        <div className={cx(styles.articles)}>
          <article key={path} className={cx(styles.article, styles.articleBox)}>
            <header>
              <Link to={path}>
                <h3>{title}</h3>
              </Link>
              <time dateTime={date}>{date}</time>
              <Categories categories={categories} />
            </header>
            <section>{description}</section>
          </article>
        </div>
      </Container>
    )
  }
}

SitePostSummary.propTypes = {
  data: PropTypes.shape({
    frontmatter: frontmatterType,
  }).isRequired,
}

export default SitePostSummary

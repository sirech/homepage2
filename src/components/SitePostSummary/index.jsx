import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Link from 'gatsby-link'
import Container from '../Container'
import Categories from '../Categories'

import styles from './style.module.scss'

import frontmatterType from '../../prop-types/frontmatter'

class SitePost extends React.Component {
  render() {
    const { data } = this.props
    const { frontmatter } = data
    const { title, path, date, categories, description } = frontmatter

    return (
      <Container>
        <div className={cx(styles.articles)}>
          <Link style={{ boxShadow: 'none' }} to={path}>
            <article key={path} className={cx(styles.article, 'card')}>
              <div className="card-body">
                <header>
                  <h3 className="card-title">{title}</h3>
                  <time className="card-subtitle" dateTime={date}>
                    {date}
                  </time>
                  <Categories categories={categories} />
                </header>
                <section className="card-text">{description}</section>
              </div>
            </article>
          </Link>
        </div>
      </Container>
    )
  }
}

SitePost.propTypes = {
  data: PropTypes.shape({
    frontmatter: frontmatterType,
    html: PropTypes.string.isRequired,
  }).isRequired,
}

export default SitePost

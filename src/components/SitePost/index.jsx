import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { Link } from 'gatsby'
import Container from '../Container'
import Categories from '../Categories'
import Share from '../Share'

import { articles, article, pageContent } from './style.module.scss'
import './images.scss'

import frontmatterType from '../../prop-types/frontmatter'
import siteType from '../../prop-types/site'

const SitePost = ({ data: { frontmatter, html }, site }) => {
  const { title, path, date, categories } = frontmatter
  return (
    <Container>
      <div className={articles}>
        <article key={path} className={cx(`${article}`)}>
          <header>
            <Link style={{ boxShadow: 'none' }} to={path}>
              <h1>{title}</h1>
              <time dateTime={date}>{date}</time>
            </Link>
            <Categories categories={categories} />
          </header>
          <section
            className={cx(`${pageContent}`, 'clearfix')}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />

          <section>
            <Share site={site} frontmatter={frontmatter} />
          </section>
        </article>
      </div>
    </Container>
  )
}

SitePost.propTypes = {
  data: PropTypes.shape({
    frontmatter: frontmatterType,
    html: PropTypes.string.isRequired,
  }).isRequired,
  site: siteType,
}

export default SitePost

import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { addIndex, map } from 'ramda'

import Link from 'gatsby-link'
import Container from '../Container'

import styles from './style.module.scss'
import './images.scss'

import frontmatterType from '../../prop-types/frontmatter'

class SitePost extends React.Component {
  categories(data) {
    return addIndex(map)((item, i) => (
      <span className="badge badge-primary text-white mr-1" key={i}>
        {item}
      </span>
    ))(data)
  }

  render() {
    const { data } = this.props
    const { frontmatter, html } = data
    const { title, path, date, category, categories } = frontmatter
    const cate = category || categories

    return (
      <Container>
        <div className={styles.articles}>
          <article key={path} className={cx(`${styles.article}`)}>
            <header>
              <Link style={{ boxShadow: 'none' }} to={path}>
                <h1>{title}</h1>
                <time dateTime={date}>{date}</time>
              </Link>
              {this.categories(cate)}
            </header>
            <section
              className={cx(`${styles.pageContent}`, 'clearfix')}
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </article>
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

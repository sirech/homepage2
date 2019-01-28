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
  more(path) {
    return (
      <Link className="readmore" to={path}>
        <span className="btn btn-outline-primary btn-block">MORE</span>
      </Link>
    )
  }

  isMore(body) {
    return body.match('<!--more-->')
  }

  description(body) {
    let test = body.replace(/<blockquote>/g, '<blockquote class="blockquote">')
    if (test.match('<!--more-->')) {
      test = test.split('<!--more-->')
      if (typeof test[0] !== 'undefined') {
        return test[0]
      }
    }
    return test
  }

  categories(data) {
    return addIndex(map)((item, i) => (
      <span className="badge badge-primary text-white mr-1" key={i}>
        {item}
      </span>
    ))(data)
  }

  render() {
    const { data, isIndex } = this.props
    const { frontmatter, html } = data
    const { title, path, date, category, categories } = frontmatter
    const cate = category || categories
    const isMore = isIndex && !!html.match('<!--more-->')

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
              className={cx(`${styles.pageContent}`)}
              dangerouslySetInnerHTML={{
                __html: isMore ? this.description(html) : html,
              }}
            />
            {isMore ? this.more(path) : ''}
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
  isIndex: PropTypes.bool,
}

export default SitePost

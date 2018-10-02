import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { Link } from 'gatsby'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import ReadNext from '../ReadNext'
import Container from '../Container'

import styles from './style.module.scss'
import './images.scss'

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
    const categories = []
    forEach(data, (item, i) => {
      categories.push(
        <span className="badge badge-primary text-white mr-1" key={i}>
          {item}
        </span>
      )
    })
    return categories
  }

  render() {
    const { site, data, isIndex } = this.props
    const title = get(data, 'frontmatter.title')
    const path = get(data, 'frontmatter.path')
    const date = get(data, 'frontmatter.date')
    const html = get(data, 'html')
    const description =
      get(data, 'frontmatter.description') || this.description(html)
    const cate =
      get(data, 'frontmatter.category') || get(data, 'frontmatter.categories')
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
              dangerouslySetInnerHTML={{ __html: isMore ? description : html }}
            />
            {isMore ? this.more(path) : ''}
            {isIndex ? '' : <ReadNext data={site} />}
          </article>
        </div>
      </Container>
    )
  }
}

SitePost.propTypes = {
  data: PropTypes.shape({
    frontmatter: PropTypes.shape({
      categories: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string,
      layout: PropTypes.string,
      path: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
  site: PropTypes.object,
  isIndex: PropTypes.bool,
}

export default SitePost

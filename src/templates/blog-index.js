import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'
import _ from 'lodash'

import SitePost from '../components/SitePost'
import Pagination from '../components/Pagination'

import siteType from '../prop-types/site'
import postType from '../prop-types/post'

const helmet = site => (
  <Helmet
    title={get(site, 'title')}
    meta={[
      { name: 'twitter:card', content: 'summary' },
      { property: 'og:title', content: get(site, 'title') },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: get(site, 'description') },
      { property: 'og:url', content: get(site, 'url') },
    ]}
  />
)

const posts = group => {
  const filteredPosts = _.filter(group, data => {
    const layout = get(data, 'post.frontmatter.layout')
    const path = get(data, 'post.path')
    return layout === 'post' && path !== '/404/'
  })

  return _.map(filteredPosts, (data, i) => (
    <LazyLoad height={500} offset={500} once key={i}>
      <SitePost data={data.post} isIndex key={i} />
    </LazyLoad>
  ))
}

const IndexPage = ({ pageContext }) => {
  const { group, additionalContext, index, pageCount } = pageContext

  return (
    <div>
      {helmet(additionalContext.siteMetadata)}
      {posts(group)}
      <Pagination index={index} pageCount={pageCount} />
    </div>
  )
}

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    index: PropTypes.number,
    pageCount: PropTypes.number,
    group: PropTypes.arrayOf(
      PropTypes.shape({
        post: postType,
      })
    ),
    additionalContext: siteType,
  }),
}

export default IndexPage

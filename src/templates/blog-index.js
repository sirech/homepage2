import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { path as Rpath, filter, map, addIndex, pipe } from 'ramda'

import SitePostSummary from '../components/SitePostSummary'
import Pagination from '../components/Pagination'

import siteType from '../prop-types/site'
import postType from '../prop-types/post'

const helmet = site => {
  const { title, description, url } = site
  return (
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:card', content: 'summary' },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
      ]}
    />
  )
}

const posts = group => {
  return pipe(
    filter(data => {
      const layout = Rpath(['post', 'frontmatter', 'layout'])(data)
      const path = Rpath(['post', 'path'])(data)
      return layout === 'post' && path !== '/404/'
    }),
    addIndex(map)((data, i) => (
      <SitePostSummary data={data.post} isIndex key={i} />
    ))
  )(group)
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

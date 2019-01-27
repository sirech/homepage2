import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'

import SitePost from '../components/SitePost'
import Pagination from '../components/Pagination'

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

const posts = (group, site) => {
  const pageLinks = []

  group.forEach((data, i) => {
    const layout = get(data, 'post.frontmatter.layout')
    const path = get(data, 'post.path')
    if (layout === 'post' && path !== '/404/') {
      pageLinks.push(
        <LazyLoad height={500} offset={500} once key={i}>
          <SitePost data={data.post} site={site} isIndex key={i} />
        </LazyLoad>
      )
    }
  })

  return pageLinks
}

const IndexPage = ({ pageContext }) => {
  const { group, additionalContext, index, pageCount } = pageContext

  return (
    <div>
      {helmet(additionalContext)}
      {posts(group, additionalContext)}
      <Pagination index={index} pageCount={pageCount} />
    </div>
  )
}

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    index: PropTypes.number,
    pageCount: PropTypes.number,
    group: PropTypes.arrayOf(PropTypes.object),
    additionalContext: PropTypes.object,
  }),
}

export default IndexPage

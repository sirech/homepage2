import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { siteMetadata } from '../../gatsby-config'

export default title => (
  <Helmet
    title={`${title} | ${get(siteMetadata, 'title')}`}
    meta={[
      { name: 'twitter:card', content: 'summary' },
      { property: 'og:title', content: title },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:description',
        content: get(siteMetadata, 'description'),
      },
    ]}
  />
)

import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { siteMetadata } from '../../gatsby-config'

export default ({ title, description }) => (
  <Helmet
    title={`${title} | ${get(siteMetadata, 'title')}`}
    meta={[
      { name: 'title', content: `${title} | ${get(siteMetadata, 'title')}` },
      { name: 'description', content: description },
      { name: 'twitter:card', content: 'summary' },
      { property: 'og:title', content: title },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:description',
        content: description,
      },
    ]}
  />
)

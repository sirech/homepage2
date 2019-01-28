import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { siteMetadata } from '../../gatsby-config'

const StandardHelmet = ({ title, description }) => (
  <Helmet
    title={`${title} | ${siteMetadata.title}`}
    meta={[
      { name: 'title', content: `${title} | ${siteMetadata.title}` },
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

StandardHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default StandardHelmet

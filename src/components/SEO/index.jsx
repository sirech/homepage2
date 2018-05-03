import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import path from 'path'
import get from 'lodash/get'

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  siteUrl,
  title,
  author,
  siteTitle,
  description,
  datePublished,
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: siteTitle,
    },
  ]

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: siteTitle,
          headline: title,
          description,
          author: {
            '@type': 'Person',
            name: author,
          },
          publisher: {
            '@type': 'Organization',
            url: siteUrl,
            name: author,
          },
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': siteUrl,
          },
          datePublished,
        },
      ]
    : schemaOrgJSONLD
}

const SEO = ({ isBlogPost, post, site }) => {
  const title = get(post, 'frontmatter.title')
  const siteTitle = get(site, 'meta.title')
  const author = get(site, 'meta.author')
  const date = isBlogPost ? get(post, 'frontmatter.date') : false

  const description = get(post, 'html')
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    .substr(0, 200)

  const siteUrl = get(site, 'meta.url')
  const url = siteUrl + get(post, 'frontmatter.path')

  const draft = get(post, 'frontmatter.draft')

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    siteUrl,
    title,
    author,
    siteTitle,
    description,
    date,
  })

  return (
    <Helmet title={`${title} | ${siteTitle}`}>
      {/* General tags */}
      <meta name="title" content={`${title} | ${siteTitle}`} />
      <meta name="description" content={description} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* hide drafts for google */}
      {draft ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={get(site, 'meta.twitter')} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      categories: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string.isRequired,
      layout: PropTypes.string,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      draft: PropTypes.bool.isRequired,
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
  site: PropTypes.shape({
    meta: PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

SEO.defaultProps = {
  isBlogPost: false,
}

export default SEO

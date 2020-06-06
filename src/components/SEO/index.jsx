import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import { path as Rpath } from 'ramda'

import getSchemaOrgJSONLD from './getSchemaOrgJSONLD'

import siteType from '../../prop-types/site'

const buildDescription = (post) => {
  const description = Rpath(['frontmatter', 'description'])(post)
  return (
    description ||
    post.html
      .replace(/<figure>[\s\S]*<\/figure>/s, '')
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
      .substr(0, 200)
  )
}

const SEO = ({ isBlogPost, post, site }) => {
  const title = Rpath(['frontmatter', 'title'])(post)
  const siteTitle = Rpath(['siteMetadata', 'title'])(site)
  const author = Rpath(['siteMetadata', 'author'])(site)

  const date = isBlogPost ? Rpath(['frontmatter', 'date'])(post) : false

  const description = buildDescription(post)

  const siteUrl = Rpath(['siteMetadata', 'url'])(site)
  const url = siteUrl + Rpath(['frontmatter', 'path'])(post)

  const draft = Rpath(['frontmatter', 'draft'])(post)
  const canonical = Rpath(['frontmatter', 'canonical'])(post)

  const image = Rpath([
    'frontmatter',
    'image',
    'childImageSharp',
    'fluid',
    'src',
  ])(post)
  const imageUrl = image ? siteUrl + image : null

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    siteUrl,
    title,
    author,
    siteTitle,
    description,
    datePublished: date,
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
      {image && <meta property="og:image" content={imageUrl} />}

      {/* Twitter Card tags */}
      <meta
        name="twitter:card"
        content={image ? 'summary_large_image' : 'summary'}
      />
      {image && <meta name="twitter:image" content={imageUrl} />}
      <meta
        name="twitter:creator"
        content={Rpath(['siteMetadata', 'twitter'])(site)}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Override canonical link */}
      {canonical ? (
        <link rel="canonical" key={canonical} href={canonical} />
      ) : null}
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
      canonical: PropTypes.string,
      image: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({
            src: PropTypes.string.isRequired,
          }),
        }),
      }),
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
  site: siteType,
}

SEO.defaultProps = {
  isBlogPost: false,
}

export default SEO

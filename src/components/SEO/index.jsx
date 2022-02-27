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

const article = (siteUrl, date) => {
  return [
    <meta key="article" property="og:type" content="article" />,
    <meta
      key="published_time"
      property="article:published_time"
      content={date.replace(/\//g, '-')}
    />,
    <meta key="author" property="article:author" content={siteUrl} />,
  ]
}

const buildImage = (post) => {
  const image = Rpath([
    'frontmatter',
    'image',
    'childImageSharp',
    'gatsbyImageData',
    'images',
    'sources',
  ])(post)

  if (image && image.length >= 1) {
    const rawImages = image[0].srcSet.split(',\n')
    const images = {}

    for (const line of rawImages) {
      const split = line.split(' ')
      images[split[1]] = split[0]
    }

    if (images['750w']) {
      return images['750w']
    }
  }

  return null
}

const SEO = ({ post, site }) => {
  const title = Rpath(['frontmatter', 'title'])(post)
  const siteTitle = Rpath(['siteMetadata', 'title'])(site)
  const author = Rpath(['siteMetadata', 'author'])(site)

  const date = Rpath(['frontmatter', 'date'])(post)

  const description = buildDescription(post)

  const siteUrl = Rpath(['siteMetadata', 'url'])(site)
  const url = siteUrl + Rpath(['frontmatter', 'path'])(post)

  const draft = Rpath(['frontmatter', 'draft'])(post)
  const canonical = Rpath(['frontmatter', 'canonical'])(post)

  const image = buildImage(post)
  const imageUrl = image ? siteUrl + image : null

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    siteUrl,
    title,
    author,
    image: imageUrl,
    siteTitle,
    description,
    datePublished: date,
  })

  return (
    <Helmet title={`${title} | ${siteTitle}`}>
      {/* General tags */}
      <meta name="title" content={`${title} | ${siteTitle}`} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />

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
      {article(siteUrl, date)}
      <meta property="og:site_name" content={siteTitle} />
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
          gatsbyImageData: PropTypes.shape({
            images: PropTypes.shape({
              sources: PropTypes.arrayOf(
                PropTypes.shape({
                  srcSet: PropTypes.string.isRequired,
                })
              ),
            }),
          }),
        }),
      }),
    }).isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
  site: siteType,
}

export default SEO

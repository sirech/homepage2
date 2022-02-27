import React from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'

import SitePost from 'components/SitePost'
import SEO from 'components/SEO'
import RelatedPosts from 'components/RelatedPosts'
import MorePosts from 'components/MorePosts'

import siteType from 'types/site'
import postType from 'types/post'
import relatedType, { Item as ItemType } from 'types/related'

const BlogPostTemplate = ({
  data: { post, site, related, previous, next },
}) => {
  return (
    <main>
      <SEO post={post} site={site} />
      <SitePost data={post} site={site} isIndex={false} />
      <RelatedPosts related={related} />
      <MorePosts previous={previous} next={next} />
    </main>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: siteType,
    post: postType,
    related: relatedType,
    previous: ItemType,
    next: ItemType,
  }).isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  fragment PostHeadline on MarkdownRemark {
    frontmatter {
      title
      path
      date(formatString: "YYYY/MM/DD")
    }
  }

  query BlogPostByPath(
    $path: String!
    $related: [String]!
    $previous: String
    $next: String
  ) {
    site {
      siteMetadata {
        title
        description
        author
        url: siteUrl
        twitter
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        layout
        title
        path
        categories
        date(formatString: "YYYY/MM/DD")
        draft
        description
        canonical
        image {
          childImageSharp {
            gatsbyImageData(width: 750, layout: CONSTRAINED)
          }
        }
      }
    }
    related: allMarkdownRemark(
      filter: { frontmatter: { path: { in: $related } } }
    ) {
      nodes {
        ...PostHeadline
      }
    }
    previous: markdownRemark(frontmatter: { path: { eq: $previous } }) {
      ...PostHeadline
    }
    next: markdownRemark(frontmatter: { path: { eq: $next } }) {
      ...PostHeadline
    }
  }
`

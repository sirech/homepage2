import React from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'

import SitePost from '../components/SitePost'
import SEO from '../components/SEO'
import RelatedPosts from '../components/RelatedPosts'

import siteType from '../prop-types/site'
import postType from '../prop-types/post'
import relatedType from '../prop-types/related'

const BlogPostTemplate = ({ data: { post, site, related } }) => {
  return (
    <main>
      <SEO post={post} site={site} />
      <SitePost data={post} site={site} isIndex={false} />
      <RelatedPosts related={related} />
    </main>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: siteType,
    post: postType,
    related: relatedType,
  }).isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!, $related: [String]!) {
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
            fluid(maxWidth: 750) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    related: allMarkdownRemark(
      filter: { frontmatter: { path: { in: $related } } }
    ) {
      nodes {
        frontmatter {
          title
          path
          date(formatString: "YYYY/MM/DD")
        }
      }
    }
  }
`

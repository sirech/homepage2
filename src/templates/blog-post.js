import React from 'react'
import PropTypes from 'prop-types'

import SitePost from '../components/SitePost'
import SEO from '../components/SEO'

import siteType from '../prop-types/site'
import postType from '../prop-types/post'

class BlogPostTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { post, site } = data

    return (
      <main>
        <SEO post={post} site={site} />
        <SitePost data={post} site={site} isIndex={false} />
      </main>
    )
  }
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: siteType,
    post: postType,
  }).isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
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
  }
`

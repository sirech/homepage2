import get from 'lodash/get'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import React from 'react'

import SitePost from '../components/SitePost'
import SitePage from '../components/SitePage'
import SEO from '../components/SEO'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this, 'props.data.post')
    const site = get(this, 'props.data.site')
    const layout = get(post, 'frontmatter.layout')
    const isBlogPost = layout !== 'page'

    let template = ''
    if (isBlogPost) {
      template = <SitePost data={post} site={site} isIndex={false} />
    } else {
      template = <SitePage {...this.props} />
    }
    return (
      <main>
        <SEO isBlogPost={isBlogPost} post={post} site={site} />
        {template}
      </main>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      meta: siteMetadata {
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
      }
    }
  }
`

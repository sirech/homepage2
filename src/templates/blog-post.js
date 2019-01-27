import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import SitePost from '../components/SitePost'
import SitePage from '../components/SitePage'
import SEO from '../components/SEO'

import siteType from '../prop-types/site'

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

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: siteType,
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
      }
    }
  }
`

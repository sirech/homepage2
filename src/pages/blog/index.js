import React from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'

import SitePost from '../../components/SitePost'

class BlogIndex extends React.Component {
  render() {
    const pageLinks = []
    const site = get(this, 'props.data.site.siteMetadata')
    const posts = get(this, 'props.data.remark.posts')

    const sortedPosts = sortBy(posts, post =>
      get(post, 'post.frontmatter.date')
    ).reverse()

    sortedPosts.forEach((data, i) => {
      const layout = get(data, 'post.frontmatter.layout')
      const path = get(data, 'post.path')
      if (layout === 'post' && path !== '/404/') {
        pageLinks.push(
          <LazyLoad height={500} offset={500} once key={i}>
            <SitePost data={data.post} site={site} isIndex key={i} />
          </LazyLoad>
        )
      }
    })

    return (
      <main>
        <Helmet
          title={get(site, 'title')}
          meta={[
            { name: 'twitter:card', content: 'summary' },
            { property: 'og:title', content: get(site, 'title') },
            { property: 'og:type', content: 'website' },
            { property: 'og:description', content: get(site, 'description') },
            { property: 'og:url', content: get(site, 'url') },
          ]}
        />
        {pageLinks}
      </main>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    remark: allMarkdownRemark(
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      posts: edges {
        post: node {
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
    }
  }
`

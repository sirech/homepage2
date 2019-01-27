const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')

const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                title
                description
                author
              }
            }
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        createPaginatedPages({
          edges: result.data.allMarkdownRemark.posts,
          createPage: createPage,
          pageTemplate: 'src/templates/blog-index.js',
          pageLength: 10,
          pathPrefix: 'blog',
          context: result.data.site,
        })

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.posts, edge => {
          createPage({
            path: edge.post.frontmatter.path,
            component: path.resolve('./src/templates/blog-post.js'),
          })
        })
      })
    )
  })
}

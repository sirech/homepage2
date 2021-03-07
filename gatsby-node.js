const path = require('path')
const _ = require('lodash')
const R = require('ramda')

const createPaginatedPages = require('gatsby-paginate')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            title
            description
            author
            url: siteUrl
            twitter
          }
        }

        singlePosts: allMarkdownRemark {
          edges {
            post: node {
              frontmatter {
                path
              }
            }
          }
        }

        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { draft: { eq: false } } }
        ) {
          edges {
            post: node {
              frontmatter {
                layout
                title
                path
                categories
                date(formatString: "YYYY/MM/DD")
                draft
                description
              }
            }
          }
        }

        tags: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { draft: { eq: false } } }
        ) {
          group(field: frontmatter___categories) {
            fieldValue
            edges {
              post: node {
                frontmatter {
                  layout
                  title
                  path
                  categories
                  date(formatString: "YYYY/MM/DD")
                  draft
                  description
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  createPaginatedPages({
    edges: result.data.posts.edges,
    createPage: createPage,
    pageTemplate: 'src/templates/blog-index.js',
    pageLength: 50,
    pathPrefix: 'blog',
    context: result.data.site,
  })

  R.forEach(({ fieldValue, edges }) => {
    const tag = _.kebabCase(fieldValue.toLowerCase())
    createPaginatedPages({
      edges: edges,
      createPage: createPage,
      pageTemplate: 'src/templates/blog-index.js',
      pageLength: 10,
      pathPrefix: `blog/tags/${tag}`,
      context: result.data.site,
    })
  })(result.data.tags.group)

  // Create blog posts pages.
  R.forEach((edge) => {
    createPage({
      path: edge.post.frontmatter.path,
      component: path.resolve('./src/templates/blog-post.js'),
    })
  })(result.data.singlePosts.edges)
}

const path = require('path')
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
                description
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
    edges: result.data.allMarkdownRemark.posts,
    createPage: createPage,
    pageTemplate: 'src/templates/blog-index.js',
    pageLength: 10,
    pathPrefix: 'blog',
    context: result.data.site,
  })

  // Create blog posts pages.
  R.forEach((edge) => {
    createPage({
      path: edge.post.frontmatter.path,
      component: path.resolve('./src/templates/blog-post.js'),
    })
  })(result.data.allMarkdownRemark.posts)
}

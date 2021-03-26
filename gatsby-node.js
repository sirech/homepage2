const path = require('path')
const _ = require('lodash')
const R = require('ramda')

const createPaginatedPages = require('gatsby-paginate')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      fragment Frontmatter on MarkdownRemark {
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
          nodes {
            frontmatter {
              path
              related
            }
          }
        }

        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { draft: { eq: false } } }
        ) {
          nodes {
            ...Frontmatter
          }
        }

        tags: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { draft: { eq: false } } }
        ) {
          group(field: frontmatter___categories) {
            fieldValue
            nodes {
              ...Frontmatter
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
    edges: result.data.posts.nodes,
    createPage: createPage,
    pageTemplate: 'src/templates/blog-index.js',
    pageLength: 50,
    pathPrefix: 'blog',
    context: result.data.site,
  })

  R.forEach(({ fieldValue, nodes }) => {
    const tag = _.kebabCase(fieldValue.toLowerCase())
    createPaginatedPages({
      edges: nodes,
      createPage: createPage,
      pageTemplate: 'src/templates/blog-index.js',
      pageLength: 50,
      pathPrefix: `blog/tags/${tag}`,
      context: result.data.site,
    })
  })(result.data.tags.group)

  // Create blog posts pages.
  R.forEach((post) => {
    createPage({
      path: post.frontmatter.path,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        related: post.frontmatter.related || [],
      },
    })
  })(result.data.singlePosts.nodes)
}

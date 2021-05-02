const path = require('path')
const _ = require('lodash')
const R = require('ramda')

const createPaginatedPages = require('gatsby-paginate')

// Custom webpack configuration
exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        types: path.resolve(__dirname, 'src/prop-types'),
      },
    },
  })

  // develop target is throwing an error that process is not defined
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: 'process/browser' })],
    })
  }
}

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
  R.addIndex(R.forEach)((post, index, list) => {
    createPage({
      path: post.frontmatter.path,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        related: post.frontmatter.related || [],
        previous: index == 0 ? null : list[index - 1].frontmatter.path,
        next:
          index == list.length - 1 ? null : list[index + 1].frontmatter.path,
      },
    })
  })(result.data.singlePosts.nodes)
}

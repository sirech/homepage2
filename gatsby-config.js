const siteUrl = process.env.SITE_URL || 'example.com'

module.exports = {
  siteMetadata: {
    title: 'Mario Fernandez',
    description:
      'This is the blog from Mario Fernandez, a Software Developer working for ThoughtWorks',
    author: 'Mario Fernandez',
    siteUrl: siteUrl,
    twitter: '@sirech',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              rel: 'noopener noreferrer',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [`/dev-404-page`],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteUrl,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            meta: siteMetadata {
              title
              description
              author
              url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.posts.map(edge => {
                return Object.assign({}, edge.post.frontmatter, {
                  url: site.meta.url + edge.post.frontmatter.path,
                  guid: site.meta.url + edge.post.frontmatter.path,
                  custom_elements: [{ 'content:encoded': edge.post.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: { frontmatter: { draft: { eq: false } } }
              ) {
                posts: edges {
                  post: node {
                    html
                    frontmatter {
                      title
                      path
                      date(formatString: "YYYY/MM/DD")
                      draft
                    }
                  }
                }
              }
            }
          `,
            setup: ({
              query: {
                site: { meta },
              },
            }) => {
              return {
                title: meta.title,
                description: meta.description,
                feed_url: meta.url + `/rss.xml`,
                site_url: meta.url,
                generator: `GatsbyJS`,
              }
            },
            output: '/rss.xml',
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
  ],
}

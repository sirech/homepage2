import getSchemaOrgJSONLD from './getSchemaOrgJSONLD'

import frontmatter from '../../fixtures/frontmatter'
import siteMetadata from '../../fixtures/siteMetadata'

describe('getSchemaOrgJSONLD', () => {
  let post
  let site

  beforeEach(() => {
    post = {
      html: '<p>this is the content</p>',
      frontmatter: frontmatter(),
    }

    site = {
      siteMetadata: siteMetadata(),
    }
  })

  it('creates the correct structure', () => {
    expect(
      getSchemaOrgJSONLD({
        isBlogPost: true,
        url: post.frontmatter.path,
        title: post.frontmatter.title,
        siteUrl: site.siteMetadata.url,
        author: site.siteMetadata.author,
        image: '/static/logo.png',
        siteTitle: site.siteMetadata.title,
        description: post.frontmatter.description,
        datePublished: post.frontmatter.date,
      })
    ).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '@testing-library/react'

import IndexPage from './blog-index'

import frontmatter from '../fixtures/frontmatter'
import siteMetadata from '../fixtures/siteMetadata'

describe('components', () => {
  describe('IndexPage', () => {
    it('renders correctly', () => {
      const site = {
        siteMetadata: siteMetadata(),
      }

      const post = { frontmatter: frontmatter() }

      const pageContext = {
        index: 3,
        pageCount: 5,
        additionalContext: site,
        group: [post, post],
        pathPrefix: 'blog',
      }

      const { asFragment } = render(<IndexPage pageContext={pageContext} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

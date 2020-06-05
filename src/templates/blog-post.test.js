import React from 'react'
import { render } from '@testing-library/react'

import BlogPostTemplate from './blog-post'

import frontmatter from '../fixtures/frontmatter'
import siteMetadata from '../fixtures/siteMetadata'
import html from '../fixtures/html'

describe('components', () => {
  describe('BlogPostTemplate', () => {
    it('renders correctly', () => {
      const site = {
        siteMetadata: siteMetadata(),
      }

      const post = { id: 'id', frontmatter: frontmatter(), html: html() }
      const data = { site, post }
      const { asFragment } = render(<BlogPostTemplate data={data} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

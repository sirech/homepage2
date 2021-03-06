import React from 'react'
import { render, screen } from '@testing-library/react'

import { pick } from 'ramda'

import BlogPostTemplate from './blog-post'

import frontmatterGenerator from '../fixtures/frontmatter'
import siteMetadata from '../fixtures/siteMetadata'
import html from '../fixtures/html'

describe('components', () => {
  describe('BlogPostTemplate', () => {
    it('renders correctly', async () => {
      const site = {
        siteMetadata: siteMetadata(),
      }

      const frontmatter = frontmatterGenerator()
      const frontmatter2 = frontmatterGenerator({ title: 'Related Post' })
      const post = { id: 'id', frontmatter, html: html() }
      const related = {
        nodes: [
          {
            frontmatter: pick(['title', 'path', 'date'])(frontmatter2),
          },
        ],
      }

      const frontmatter3 = frontmatterGenerator({ title: 'Next' })
      const data = { site, post, related, next: { frontmatter: frontmatter3 } }
      render(<BlogPostTemplate data={data} />)

      await screen.findByText(frontmatter.title)
      await screen.findByText('Related Posts')

      await screen.findByText('Keep Reading')
      await screen.findByText(frontmatter3.title)
    })
  })
})

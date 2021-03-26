import React from 'react'
import { render, screen } from '@testing-library/react'

import { pick } from 'ramda'

import RelatedPosts from './index'

import frontmatterGenerator from 'fixtures/frontmatter'

describe('components', () => {
  describe('RelatedPosts', () => {
    it('renders correctly', async () => {
      const frontmatter = frontmatterGenerator()
      const related = {
        nodes: [
          {
            frontmatter: pick(['title', 'path', 'date'])(frontmatter),
          },
        ],
      }
      render(<RelatedPosts related={related} />)
      await screen.findByText('Related Posts')

      await screen.findByText(frontmatter.title)
      expect(screen.getByText(frontmatter.title).closest('a').href).toContain(
        frontmatter.path
      )
    })

    it('is empty if there are no posts', async () => {
      const { container } = render(<RelatedPosts related={{ nodes: [] }} />)
      expect(container.firstChild).toBeNull()
    })
  })
})

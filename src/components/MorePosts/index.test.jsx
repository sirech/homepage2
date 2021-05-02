import React from 'react'
import { render, screen } from '@testing-library/react'

import MorePosts from './index'

import frontmatterGenerator from 'fixtures/frontmatter'

describe('components', () => {
  describe('MorePosts', () => {
    it('renders correctly', async () => {
      const frontmatter = frontmatterGenerator({ title: 'Previous' })
      const frontmatter2 = frontmatterGenerator({ title: 'Next' })
      render(
        <MorePosts
          previous={{ frontmatter }}
          next={{ frontmatter: frontmatter2 }}
        />
      )
      await screen.findByText('Keep Reading')

      await screen.findByText(frontmatter.title)
      expect(screen.getByText(frontmatter.title).closest('a').href).toContain(
        frontmatter.path
      )

      await screen.findByText(frontmatter2.title)
      expect(screen.getByText(frontmatter2.title).closest('a').href).toContain(
        frontmatter2.path
      )
    })

    it('works for empty posts', async () => {
      const frontmatter = frontmatterGenerator({ title: 'Previous' })
      render(<MorePosts previous={{ frontmatter }} />)
      await screen.findByText('Keep Reading')

      await screen.findByText(frontmatter.title)
      expect(screen.getByText(frontmatter.title).closest('a').href).toContain(
        frontmatter.path
      )
    })
  })
})

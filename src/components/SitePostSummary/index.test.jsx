import React from 'react'
import { render } from '@testing-library/react'
import SitePost from './index'

import frontmatter from '../../fixtures/frontmatter'
import html from '../../fixtures/html'

describe('components', () => {
  describe('SitePostSummary', () => {
    it('renders correctly', () => {
      const data = { html: html(), frontmatter: frontmatter() }
      const { asFragment } = render(<SitePost data={data} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

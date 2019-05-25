import React from 'react'
import renderer from 'react-test-renderer'
import SitePost from './index'

import frontmatter from '../../fixtures/frontmatter'
import html from '../../fixtures/html'

describe('components', () => {
  describe('SitePost', () => {
    it('renders correctly', () => {
      const data = { html: html(), frontmatter: frontmatter() }
      const component = renderer.create(<SitePost data={data} />)
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})

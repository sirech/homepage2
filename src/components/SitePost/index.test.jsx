import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SitePost from './index'

import frontmatter from '../../fixtures/frontmatter'
import html from '../../fixtures/html'

describe('components', () => {
  describe('SitePost', () => {
    it('renders correctly', () => {
      const data = { html: html(), frontmatter: frontmatter() }
      const component = shallow(<SitePost data={data} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

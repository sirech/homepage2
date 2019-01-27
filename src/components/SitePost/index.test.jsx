import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SitePost from './index'

import frontmatter from '../../fixtures/frontmatter'

describe('components', () => {
  describe('SitePost', () => {
    it('renders correctly', () => {
      const data = { html: '<div>content</div>', frontmatter: frontmatter() }
      const component = shallow(<SitePost data={data} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

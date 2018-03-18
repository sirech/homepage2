import React from 'react'
import { shallow } from 'enzyme'
import SitePost from './index'

describe('components', () => {
  describe('SitePost', () => {
    it('renders correctly', () => {
      const data = { html: '<div></div>' }
      const component = shallow(<SitePost data={data} />)
      expect(component).toHaveLength(1)
    })
  })
})

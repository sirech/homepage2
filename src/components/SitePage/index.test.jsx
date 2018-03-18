import React from 'react'
import { shallow } from 'enzyme'
import SitePage from './index'

describe('components', () => {
  describe('SitePage', () => {
    it('renders correctly', () => {
      const data = { post: { html: '<div></div>' } }
      const component = shallow(<SitePage data={data} />)
      expect(component).toHaveLength(1)
    })
  })
})

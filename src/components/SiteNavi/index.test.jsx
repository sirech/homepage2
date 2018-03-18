import React from 'react'
import { shallow } from 'enzyme'
import SiteNavi from './index'

describe('components', () => {
  describe('SiteNavi', () => {
    it('renders correctly', () => {
      const location = { pathname: '/' }
      const component = shallow(<SiteNavi location={location} />)
      expect(component).toHaveLength(1)
    })
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import Footer from './index'

describe('components', () => {
  describe('Footer', () => {
    it('renders correctly', () => {
      const component = shallow(<Footer />)
      expect(component).toHaveLength(1)
    })
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import About from './About'

describe('components', () => {
  describe('About', () => {
    it('renders correctly', () => {
      const component = shallow(<About />)
      expect(component).toHaveLength(1)
    })
  })
})

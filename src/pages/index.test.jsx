import React from 'react'
import { shallow } from 'enzyme'
import Profile from './index'

describe('components', () => {
  describe('Profile', () => {
    it('renders correctly', () => {
      const component = shallow(<Profile />)
      expect(component).toHaveLength(1)
    })
  })
})

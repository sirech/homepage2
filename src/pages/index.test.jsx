import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Profile from './index'

describe('components', () => {
  describe('Profile', () => {
    it('renders correctly', () => {
      const component = shallow(<Profile />)
      expect(component).toHaveLength(1)
    })

    it('renders correctly for a blogpost', () => {
      const component = shallow(<Profile />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

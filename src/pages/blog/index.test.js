import React from 'react'
import { shallow } from 'enzyme'
import BlogIndex from './index'

describe('components', () => {
  describe('BlogIndex', () => {
    it('renders correctly', () => {
      const component = shallow(<BlogIndex />)
      expect(component).toHaveLength(1)
    })
  })
})

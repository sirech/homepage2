import React from 'react'
import { shallow } from 'enzyme'
import ReadNext from './index'

describe('components', () => {
  describe('ReadNext', () => {
    it('renders correctly', () => {
      const component = shallow(<ReadNext />)
      expect(component).toHaveLength(1)
    })
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import Tools from './index'

describe('components', () => {
  describe('Tools', () => {
    it('renders correctly', () => {
      const component = shallow(<Tools />)
      expect(component).toHaveLength(1)
    })
  })
})

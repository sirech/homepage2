import React from 'react'
import { shallow } from 'enzyme'
import Talks from './index'

describe('components', () => {
  describe('Talks', () => {
    it('renders correctly', () => {
      const component = shallow(<Talks />)
      expect(component).toHaveLength(1)
    })
  })
})

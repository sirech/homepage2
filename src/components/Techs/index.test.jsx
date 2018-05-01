import React from 'react'
import { shallow } from 'enzyme'
import Techs from './index'

describe('components', () => {
  describe('Techs', () => {
    it('renders correctly', () => {
      const component = shallow(<Techs />)
      expect(component).toHaveLength(1)
    })
  })
})

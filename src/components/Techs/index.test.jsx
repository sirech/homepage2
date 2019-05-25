import React from 'react'
import renderer from 'react-test-renderer'
import Techs from './index'

describe('components', () => {
  describe('Techs', () => {
    it('renders correctly', () => {
      const component = renderer.create(<Techs />)
      expect(component).not.toBeNull()
    })
  })
})

import React from 'react'
import renderer from 'react-test-renderer'
import Talks from './index'

describe('components', () => {
  describe('Talks', () => {
    it('renders correctly', () => {
      const component = renderer.create(<Talks />)
      expect(component).not.toBeNull()
    })
  })
})

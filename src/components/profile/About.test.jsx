import React from 'react'
import renderer from 'react-test-renderer'
import About from './About'

describe('components', () => {
  describe('About', () => {
    it('renders correctly', () => {
      const component = renderer.create(<About />)
      expect(component).not.toBeNull()
    })
  })
})

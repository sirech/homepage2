import React from 'react'
import renderer from 'react-test-renderer'
import Tools from './index'

describe('components', () => {
  describe('Tools', () => {
    it('renders correctly', () => {
      const component = renderer.create(<Tools />)
      expect(component).not.toBeNull()
    })
  })
})

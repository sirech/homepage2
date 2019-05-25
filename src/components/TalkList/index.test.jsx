import React from 'react'
import renderer from 'react-test-renderer'
import TalkList from './index'

describe('components', () => {
  describe('TalkList', () => {
    it('renders correctly', () => {
      const component = renderer.create(<TalkList />)
      expect(component).not.toBeNull()
    })
  })
})

import React from 'react'
import renderer from 'react-test-renderer'
import Container from './index'

describe('components', () => {
  describe('Container', () => {
    it('renders correctly', () => {
      const component = renderer.create(
        <Container>
          <p>Text</p>
        </Container>
      )
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})

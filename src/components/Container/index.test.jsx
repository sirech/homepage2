import React from 'react'
import { render } from '@testing-library/react'
import Container from './index'

describe('components', () => {
  describe('Container', () => {
    it('renders correctly', () => {
      const { asFragment } = render(
        <Container>
          <p>Text</p>
        </Container>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

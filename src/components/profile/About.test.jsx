import React from 'react'
import { render } from '@testing-library/react'
import About from './About'

describe('components', () => {
  describe('About', () => {
    it('renders correctly', async () => {
      render(<About />)
    })
  })
})

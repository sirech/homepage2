import React from 'react'
import { render } from '@testing-library/react'
import Footer from './index'

describe('components', () => {
  describe('Footer', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<Footer />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

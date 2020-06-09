import React from 'react'
import { render } from '@testing-library/react'
import Newsletter from './index'

describe('components', () => {
  describe('Newsletter', () => {
    it('renders correctly', async () => {
      const { asFragment } = render(<Newsletter />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

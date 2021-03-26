import React from 'react'
import { render } from '@testing-library/react'
import Time from './index'

describe('components', () => {
  describe('Time', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<Time date="2020/01/01" />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

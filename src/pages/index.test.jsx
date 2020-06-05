import React from 'react'
import { render } from '@testing-library/react'
import Profile from './index'

describe('components', () => {
  describe('Profile', () => {
    it('renders correctly', () => {
      const { asFragment } = render(<Profile />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

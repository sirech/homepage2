import React from 'react'
import { render, screen } from '@testing-library/react'
import Tools from './index'

describe('components', () => {
  describe('Tools', () => {
    it('renders correctly', async () => {
      render(<Tools />)
      await screen.findByText('Tools')
    })
  })
})

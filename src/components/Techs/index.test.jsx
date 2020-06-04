import React from 'react'
import { render, screen } from '@testing-library/react'
import Tech from './index'

describe('components', () => {
  describe('Tech', () => {
    it('renders correctly', async () => {
      render(<Tech />)

      await screen.findByText('Technologies')
      await screen.findByTitle('React')
    })
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import TalkList from './index'

describe('components', () => {
  describe('TalkList', () => {
    it('renders correctly', async () => {
      render(<TalkList />)

      await screen.findByText('2020')
      await screen.findByText('TDD against the odds')
    })
  })
})

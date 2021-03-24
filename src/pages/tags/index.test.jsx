import React from 'react'
import { render, screen } from '@testing-library/react'
import Tags from './index'

describe('pages', () => {
  describe('Tags', () => {
    it('renders correctly', async () => {
      const group = [
        { tag: 'AWS', count: 6 },
        { tag: 'Architecture', count: 2 },
      ]
      const tags = { group }
      const data = { tags }
      render(<Tags data={data} />)

      await screen.findByText('Top Tags')
      await screen.findByText('AWS', { exact: false })
      await screen.findByText('Other Tags')
    })
  })
})

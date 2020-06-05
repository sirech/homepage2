import React from 'react'
import { render, waitFor } from '@testing-library/react'
import StandardHelmet from './StandardHelmet'

describe('components', () => {
  describe('StandardHelmet', () => {
    it('renders correctly for a blogpost', async () => {
      render(<StandardHelmet title="the title" description="the description" />)
      await waitFor(() =>
        expect(document.querySelector('head')).not.toBeEmptyDOMElement()
      )

      expect(document.querySelector('head')).toMatchSnapshot()
    })
  })
})

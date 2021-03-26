import React from 'react'
import { render } from '@testing-library/react'
import Card from './index'

describe('components', () => {
  describe('Card', () => {
    it('renders correctly', () => {
      const { asFragment } = render(
        <Card>
          <p>Text</p>
        </Card>
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('supports extra arguments', () => {
      const { asFragment } = render(
        <Card tag="li" className="extra">
          <p>Text</p>
        </Card>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

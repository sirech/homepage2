import React from 'react'
import { render } from '@testing-library/react'
import Category from './index'

describe('components', () => {
  describe('Category', () => {
    it('renders correctly', () => {
      const { asFragment } = render(
        <Category item={'React'} text={'React - 3'} />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

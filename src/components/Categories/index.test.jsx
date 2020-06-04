import React from 'react'
import { render } from '@testing-library/react'
import Categories from './index'

describe('components', () => {
  describe('Categories', () => {
    it('renders correctly', () => {
      const { asFragment } = render(
        <Categories categories={['React', 'SpringBoot', 'SSL Certificates']} />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

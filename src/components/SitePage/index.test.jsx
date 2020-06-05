import React from 'react'
import { render } from '@testing-library/react'
import SitePage from './index'

describe('components', () => {
  describe('SitePage', () => {
    it('renders correctly', () => {
      const data = { post: { html: '<div></div>' } }
      const { asFragment } = render(<SitePage data={data} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

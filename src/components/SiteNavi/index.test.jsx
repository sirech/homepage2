import React from 'react'
import { render } from '@testing-library/react'
import SiteNavi from './index'

describe('components', () => {
  describe('SiteNavi', () => {
    it('renders correctly', () => {
      const location = { pathname: '/' }
      const { asFragment } = render(
        <SiteNavi title="title" location={location} />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})

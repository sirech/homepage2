import React from 'react'
import renderer from 'react-test-renderer'
import SiteNavi from './index'

describe('components', () => {
  describe('SiteNavi', () => {
    it('renders correctly', () => {
      const location = { pathname: '/' }
      const component = renderer.create(
        <SiteNavi title="title" location={location} />
      )
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})

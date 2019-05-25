import React from 'react'
import renderer from 'react-test-renderer'
import SitePage from './index'

describe('components', () => {
  describe('SitePage', () => {
    it('renders correctly', () => {
      const data = { post: { html: '<div></div>' } }
      const component = renderer.create(<SitePage data={data} />)
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})

import React from 'react'
import renderer from 'react-test-renderer'
import Share from './index'

import frontmatter from '../../fixtures/frontmatter'
import siteMetadata from '../../fixtures/siteMetadata'

describe('components', () => {
  describe('Share', () => {
    let site

    beforeEach(() => {
      site = {
        siteMetadata: siteMetadata(),
      }
    })

    it('renders the share buttons', () => {
      const component = renderer.create(
        <Share site={site} path={frontmatter().path} />
      )
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})

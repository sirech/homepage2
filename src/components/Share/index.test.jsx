import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
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
      const component = shallow(
        <Share site={site} frontmatter={frontmatter()} />
      )
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

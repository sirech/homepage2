import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import IndexPage from './blog-index'

import frontmatter from '../fixtures/frontmatter'
import siteMetadata from '../fixtures/siteMetadata'
import html from '../fixtures/html'

describe('components', () => {
  describe('IndexPage', () => {
    it('renders correctly', () => {
      const site = {
        siteMetadata: siteMetadata(),
      }

      const post = { id: 'id', frontmatter: frontmatter(), html: html() }

      const pageContext = {
        index: 3,
        pageCount: 5,
        additionalContext: site,
        group: [{ post }, { post }],
      }

      const component = shallow(<IndexPage pageContext={pageContext} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

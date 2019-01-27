import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import BlogPostTemplate from './blog-post'

import frontmatter from '../fixtures/frontmatter'
import siteMetadata from '../fixtures/siteMetadata'

describe('components', () => {
  describe('BlogPostTemplate', () => {
    it('renders correctly', () => {
      const site = {
        siteMetadata: siteMetadata(),
      }

      const post = { frontmatter: frontmatter(), html: '<div>content</div>' }
      const data = { site, post }
      const component = shallow(<BlogPostTemplate data={data} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

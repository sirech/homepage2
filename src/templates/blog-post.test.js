import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import BlogPostTemplate from './blog-post'

import frontmatter from '../fixtures/frontmatter'
import siteMetadata from '../fixtures/siteMetadata'
import html from '../fixtures/html'

describe('components', () => {
  describe('BlogPostTemplate', () => {
    it('renders correctly', () => {
      const site = {
        siteMetadata: siteMetadata(),
      }

      const post = { id: 'id', frontmatter: frontmatter(), html: html() }
      const data = { site, post }
      const component = shallow(<BlogPostTemplate data={data} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})
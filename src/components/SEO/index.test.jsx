import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SEO from './index'

describe('components', () => {
  describe('SEO', () => {
    const post = {
      html: '<p>this is the content</p>',
      frontmatter: {
        title: 'title',
        path: '/post',
        date: '2018/03/01',
        draft: false,
      },
    }

    const site = {
      meta: {
        author: 'me',
        description: 'description',
        title: 'site title',
        twitter: '@handle',
        url: 'http://example.com',
      },
    }

    it('renders correctly for a blogpost', () => {
      const component = shallow(<SEO isBlogPost post={post} site={site} />)
      expect(toJson(component)).toMatchSnapshot()
    })

    it('does not index draft posts', () => {
      const draft = {
        html: post.html,
        frontmatter: { ...post.frontmatter, draft: true },
      }

      const component = shallow(<SEO isBlogPost post={draft} site={site} />)
      expect(toJson(component)).toMatchSnapshot()
    })

    it('renders correctly for a normal page', () => {
      const component = shallow(
        <SEO isBlogPost={false} post={post} site={site} />
      )
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

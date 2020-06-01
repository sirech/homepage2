import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SEO from './index'

import frontmatter from '../../fixtures/frontmatter'
import siteMetadata from '../../fixtures/siteMetadata'

describe('components', () => {
  describe('SEO', () => {
    let post
    let site

    beforeEach(() => {
      post = {
        html: '<p>this is the content</p>',
        frontmatter: frontmatter(),
      }

      site = {
        siteMetadata: siteMetadata(),
      }
    })

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

    it('description can be overriden', () => {
      const description = 'This is another description'

      post.frontmatter.description = description

      const component = shallow(<SEO isBlogPost post={post} site={site} />)
      expect(toJson(component)).toMatchSnapshot()
    })

    it('can override canonical', () => {
      const draft = {
        html: post.html,
        frontmatter: { ...post.frontmatter, canonical: 'http://dude.com' },
      }

      const component = shallow(<SEO isBlogPost post={draft} site={site} />)
      expect(toJson(component)).toMatchSnapshot()
    })

    it('includes the image in the metadata', () => {
      const image = {
        childImageSharp: {
          fluid: {
            src: '/static/logo.png',
          },
        },
      }
      const draft = {
        html: post.html,
        frontmatter: { ...post.frontmatter, image },
      }

      const component = shallow(<SEO isBlogPost post={draft} site={site} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

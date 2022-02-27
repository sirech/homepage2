import React from 'react'
import { render, waitFor } from '@testing-library/react'
import SEO from './index'

import frontmatter from '../../fixtures/frontmatter'
import siteMetadata from '../../fixtures/siteMetadata'

describe('components', () => {
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

  describe('SEO', () => {
    it('renders correctly for a blogpost', async () => {
      render(<SEO post={post} site={site} />)
      await waitFor(() =>
        expect(document.querySelector('head')).not.toBeEmptyDOMElement()
      )

      expect(document.querySelector('head')).toMatchSnapshot()
    })

    it('does not index draft posts', async () => {
      const draft = {
        html: post.html,
        frontmatter: { ...post.frontmatter, draft: true },
      }

      render(<SEO post={draft} site={site} />)
      await waitFor(() =>
        expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
          'content',
          'noindex'
        )
      )
    })

    it('description can be overriden', async () => {
      const description = 'This is another description'
      post.frontmatter.description = description

      render(<SEO post={post} site={site} />)
      await waitFor(() =>
        expect(
          document.querySelector('meta[name="description"]')
        ).toHaveAttribute('content', description)
      )
    })

    it('canonical can be overriden', async () => {
      const draft = {
        html: post.html,
        frontmatter: { ...post.frontmatter, canonical: 'http:dude.com' },
      }

      render(<SEO post={draft} site={site} />)
      await waitFor(() =>
        expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
          'href',
          draft.frontmatter.canonical
        )
      )
    })

    it('includes the image in the metadata', async () => {
      const imageUrl =
        '/static/ba4de542f3c100c4bbb8ab30e7b392cf/15f20/cover.webp'
      const image = {
        childImageSharp: {
          gatsbyImageData: {
            height: 502,
            width: 750,
            layout: 'constrained',
            images: {
              sources: [
                {
                  sizes: '(min-width: 750px) 750px, 100vw',
                  srcSet:
                    '/static/ba4de542f3c100c4bbb8ab30e7b392cf/31395/cover.webp 188w,\n/static/ba4de542f3c100c4bbb8ab30e7b392cf/9bc7c/cover.webp 375w,\n/static/ba4de542f3c100c4bbb8ab30e7b392cf/15f20/cover.webp 750w,\n/static/ba4de542f3c100c4bbb8ab30e7b392cf/7662c/cover.webp 1500w',
                  type: 'image/webp',
                },
              ],
            },
          },
        },
      }
      const draft = {
        html: post.html,
        frontmatter: { ...post.frontmatter, image },
      }

      render(<SEO post={draft} site={site} />)
      await waitFor(() =>
        expect(
          document.querySelector('meta[property="og:image"]')
        ).toHaveAttribute('content', `http://example.com${imageUrl}`)
      )

      expect(
        document.querySelector('meta[name="twitter:card"]')
      ).toHaveAttribute('content', 'summary_large_image')
      expect(
        document.querySelector('meta[name="twitter:image"]')
      ).toHaveAttribute('content', `http://example.com${imageUrl}`)
    })
  })
})

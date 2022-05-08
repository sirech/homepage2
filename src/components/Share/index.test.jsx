import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Share from './index'

import frontmatter from '../../fixtures/frontmatter'
import siteMetadata from '../../fixtures/siteMetadata'

describe('components', () => {
  describe('Share', () => {
    let site
    let user

    beforeEach(() => {
      site = {
        siteMetadata: siteMetadata(),
      }
      window.open = jest.fn()
      user = userEvent.setup()
    })

    it('renders the facebook share button', async () => {
      render(<Share site={site} frontmatter={frontmatter()} />)

      await user.click(screen.getByLabelText('facebook'))
      expect(window.open.mock.calls[0][0]).toEqual(
        'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fexample.com%2Fthe-post&quote=this%20is%20the%20description'
      )
    })

    it('renders the twitter share button', async () => {
      render(
        <Share
          site={site}
          frontmatter={frontmatter({
            categories: ['Functional Programming', 'DevOps'],
          })}
        />
      )

      await user.click(screen.getByLabelText('twitter'))
      expect(window.open.mock.calls[0][0]).toEqual(
        'https://twitter.com/share?url=http%3A%2F%2Fexample.com%2Fthe-post&text=My%20Post&via=handle&hashtags=functionalprogramming%2Cdevops'
      )
    })

    it('renders the linkedin share button', async () => {
      render(<Share site={site} frontmatter={frontmatter()} />)

      await user.click(screen.getByLabelText('linkedin'))
      expect(window.open.mock.calls[0][0]).toEqual(
        'https://linkedin.com/shareArticle?url=http%3A%2F%2Fexample.com%2Fthe-post&mini=true&title=My%20Post&summary=this%20is%20the%20description'
      )
    })
  })
})

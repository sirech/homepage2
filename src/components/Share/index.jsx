import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share'

import { path as Rpath } from 'ramda'

import frontmatterType from '../../prop-types/frontmatter'
import siteType from '../../prop-types/site'

import { share, cta, buttons } from './style.module.scss'

const Share = ({ frontmatter, site }) => {
  const { path, title, categories, description } = frontmatter

  const siteUrl = Rpath(['siteMetadata', 'url'])(site)
  const twitter = Rpath(['siteMetadata', 'twitter'])(site)

  const url = siteUrl + path

  return (
    <div className={share}>
      <div className={cta}>Did you like it? Give it a share!</div>
      <div className={buttons}>
        <FacebookShareButton url={url} data-testid="facebook">
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          data-testid="twitter"
          url={url}
          title={title}
          via={twitter.replace(/@/, '')}
          hashtags={categories.map((tag) => tag.toLowerCase().replace(/ /, ''))}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton
          data-testid="linkedin"
          url={url}
          title={title}
          summary={description}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <EmailShareButton
          data-testid="email"
          subject={title}
          body={description + ' ' + url}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  )
}

Share.propTypes = {
  frontmatter: frontmatterType,
  site: siteType,
}

export default Share

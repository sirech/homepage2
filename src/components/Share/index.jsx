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

import styles from './style.module.scss'

const Share = ({ frontmatter, site }) => {
  const { path, title, categories, description } = frontmatter

  const siteUrl = Rpath(['siteMetadata', 'url'])(site)
  const twitter = Rpath(['siteMetadata', 'twitter'])(site)

  const url = siteUrl + path

  return (
    <div className={styles.share}>
      <div className={styles.cta}>Did you like it? Give it a share!</div>
      <div className={styles.buttons}>
        <FacebookShareButton url={url} quote={description}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={url}
          title={title}
          via={twitter.replace(/@/, '')}
          hashtags={categories.map((tag) =>
            tag.toLowerCase().replace(/ /, '-')
          )}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton url={url} title={title} summary={description}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <EmailShareButton subject={title} body={description + ' ' + url}>
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

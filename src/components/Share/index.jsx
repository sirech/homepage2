import React from 'react'
import { FacebookShareButton, FacebookIcon } from 'react-share'

import PropTypes from 'prop-types'

import { path as Rpath } from 'ramda'

import siteType from '../../prop-types/site'

const Share = ({ path, site }) => {
  const siteUrl = Rpath(['siteMetadata', 'url'])(site)
  const url = siteUrl + path

  return (
    <div>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  )
}

Share.propTypes = {
  path: PropTypes.string.isRequired,
  site: siteType,
}

export default Share

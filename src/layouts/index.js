import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { siteMetadata } from '../../gatsby-config'
import SiteNavi from '../components/SiteNavi'
import emergence from 'emergence.js'

import './gatstrap.scss'
import 'prismjs/themes/prism-coy.css'
import 'devicon/devicon.min.css'
import 'font-awesome/css/font-awesome.css'

const Template = (props) => {
  useEffect(() => {
    emergence.init()
  })

  return (
    <div>
      <SiteNavi title={siteMetadata.title} {...props} />
      {props.children}
    </div>
  )
}

Template.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Template

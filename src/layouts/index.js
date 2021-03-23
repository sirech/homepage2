import React from 'react'
import PropTypes from 'prop-types'
import { siteMetadata } from '../../gatsby-config'
import SiteNavi from '../components/SiteNavi'
import emergence from 'emergence.js'

import './gatstrap.scss'
import 'prismjs/themes/prism-coy.css'
import 'devicon/devicon.min.css'
import 'font-awesome/css/font-awesome.css'

class Template extends React.Component {
  componentDidMount() {
    emergence.init()
  }

  componentDidUpdate() {
    emergence.init()
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <SiteNavi title={siteMetadata.title} {...this.props} />
        {children}
      </div>
    )
  }
}

Template.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Template

import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class SitePage extends React.Component {
  render() {
    const post = this.props.data.post
    return <div dangerouslySetInnerHTML={{ __html: post.html }} />
  }
}

SitePage.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default SitePage

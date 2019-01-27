import PropTypes from 'prop-types'

export default PropTypes.shape({
  siteMetadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
  }).isRequired,
}).isRequired

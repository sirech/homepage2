import PropTypes from 'prop-types'

import frontmatterType from './frontmatter.js'

export default PropTypes.shape({
  id: PropTypes.string,
  html: PropTypes.string.isRequired,
  frontmatter: frontmatterType,
}).isRequired

import PropTypes from 'prop-types'

import frontmatterType from './frontmatter.js'

export default PropTypes.shape({
  id: PropTypes.string,
  frontmatter: frontmatterType,
}).isRequired

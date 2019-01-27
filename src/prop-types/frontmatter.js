import PropTypes from 'prop-types'

export default PropTypes.shape({
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  draft: PropTypes.bool.isRequired,
  description: PropTypes.string,
}).isRequired

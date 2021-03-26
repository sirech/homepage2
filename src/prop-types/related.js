import PropTypes from 'prop-types'

export default PropTypes.shape({
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
}).isRequired

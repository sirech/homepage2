import PropTypes from 'prop-types'

export const Item = PropTypes.shape({
  date: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
})

export default PropTypes.shape({
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: Item,
    })
  ).isRequired,
}).isRequired

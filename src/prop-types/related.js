import PropTypes from 'prop-types'

const Frontmatter = PropTypes.shape({
  date: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
})

export const Item = PropTypes.shape({
  frontmatter: Frontmatter,
})

export default PropTypes.shape({
  nodes: PropTypes.arrayOf(Item).isRequired,
}).isRequired

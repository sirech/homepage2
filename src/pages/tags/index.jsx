import React from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'

import Container from '../../components/Container'
import Category from '../../components/Category'

const Tag = ({ tag, count }) => (
  <Category
    item={tag}
    text={
      <>
        {tag} - <em>{count}</em>
      </>
    }
  />
)

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
}

const Tags = ({
  data: {
    tags: { group },
  },
}) => {
  return (
    <main>
      <Container>
        {group.map(({ tag, count }) => (
          <Tag key={tag} tag={tag} count={count} />
        ))}
      </Container>
    </main>
  )
}

Tags.propTypes = {
  data: PropTypes.shape({
    tags: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          tag: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default Tags

export const pageQuery = graphql`
  query {
    tags: allMarkdownRemark(filter: { frontmatter: { draft: { eq: false } } }) {
      group(field: frontmatter___categories) {
        tag: fieldValue
        count: totalCount
      }
    }
  }
`

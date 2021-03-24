import React from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'

import groupTags from './group-tag'

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
  const { top, other } = groupTags(group, 10)
  return (
    <main>
      <Container>
        <section className="mt-4">
          <h2>Top Tags</h2>
          {top.map(({ tag, count }) => (
            <Tag key={tag} tag={tag} count={count} />
          ))}
        </section>

        <section className="mt-4">
          <h2>Other Tags</h2>
          {other.map(({ tag, count }) => (
            <Tag key={tag} tag={tag} count={count} />
          ))}
        </section>
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

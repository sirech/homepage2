import React from 'react'

import Container from '../Container'

import relatedType from '../../prop-types/related'

const RelatedPosts = ({ related: { nodes } }) => {
  if (nodes.length === 0) {
    return <></>
  }

  return (
    <Container>
      <h2>Related Posts</h2>
      {nodes.map(({ frontmatter: { title, path } }) => (
        <span key={path}>{title}</span>
      ))}
    </Container>
  )
}

RelatedPosts.propTypes = {
  related: relatedType,
}

export default RelatedPosts

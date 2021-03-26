import React from 'react'

import Link from 'gatsby-link'

import Container from 'components/Container'
import Card from 'components/Card'
import Time from 'components/Time'

import relatedType, { Item as ItemType } from 'types/related'

import styles from './style.module.scss'

const Item = ({ frontmatter: { title, path, date } }) => (
  <Card tag="li" className={styles.item}>
    <Link to={path}>
      <h4>{title}</h4>
    </Link>
    <Time date={date} />
  </Card>
)

Item.propTypes = {
  frontmatter: ItemType.isRequired,
}

const RelatedPosts = ({ related: { nodes } }) => {
  if (nodes.length === 0) {
    return <></>
  }

  return (
    <Container className={styles.related}>
      <h2>Related Posts</h2>
      <ul className={styles.list}>
        {nodes.map(({ frontmatter }) => (
          <Item key={frontmatter.path} frontmatter={frontmatter} />
        ))}
      </ul>
    </Container>
  )
}

RelatedPosts.propTypes = {
  related: relatedType,
}

export default RelatedPosts

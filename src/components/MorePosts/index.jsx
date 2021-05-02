import React from 'react'
import PropType from 'prop-types'

import Link from 'gatsby-link'

import Container from 'components/Container'
import Card from 'components/Card'

import { Item as ItemType } from 'types/related'

import {
  more,
  list,
  item,
  position as positionStyle,
} from './style.module.scss'

const Item = ({ frontmatter, position }) => (
  <Card tag="li" className={item}>
    <h5 className={positionStyle}>{position}</h5>
    {frontmatter && (
      <>
        <Link to={frontmatter.path}>
          <h4>{frontmatter.title}</h4>
        </Link>
      </>
    )}
  </Card>
)

Item.propTypes = {
  frontmatter: ItemType,
  position: PropType.string,
}

const MorePosts = ({ previous, next }) => {
  return (
    <Container className={more}>
      <h2>Keep Reading</h2>
      <ul className={list}>
        <Item frontmatter={previous?.frontmatter} position="previous" />
        <Item frontmatter={next?.frontmatter} position="next" />
      </ul>
    </Container>
  )
}

MorePosts.propTypes = {
  previous: ItemType,
  next: ItemType,
}

export default MorePosts

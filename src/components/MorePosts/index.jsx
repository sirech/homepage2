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

const Item = ({ frontmatter: { title, path }, position }) => (
  <Card tag="li" className={item}>
    <h5 className={positionStyle}>{position}</h5>
    <Link to={path}>
      <h4>{title}</h4>
    </Link>
  </Card>
)

Item.propTypes = {
  frontmatter: ItemType.isRequired,
  position: PropType.string,
}

const MorePosts = ({ previous, next }) => {
  return (
    <Container className={more}>
      <h2>Keep Reading</h2>
      <ul className={list}>
        <Item frontmatter={previous.frontmatter} position="previous" />
        <Item frontmatter={next.frontmatter} position="next" />
      </ul>
    </Container>
  )
}

MorePosts.propTypes = {
  previous: ItemType,
  next: ItemType,
}

export default MorePosts

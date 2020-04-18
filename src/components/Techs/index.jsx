import React from 'react'

import Container from '../Container'

import styles from './style.module.scss'
import techs from './techList'

const techItem = ([title, name]) => (
  <li
    className={styles.tech}
    data-toggle="tooltip"
    data-placement="top"
    title={title}
    key={name}
  >
    <i className={`tech-icon devicon-${name}-plain`} data-emergence="hidden" />
  </li>
)

export default () => (
  <div className="technologies">
    <Container>
      <h2 className="section-heading text-center">Technologies</h2>
      <p>
        Following the{' '}
        <a
          className="text-dark"
          href="https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
        >
          Pragmatic Programmer
        </a>{' '}
        advice, I try to learn some new technology every year. My github account
        is full of small projects I have started to teach myself new things,
        such as this page itself. A list of them, in no particular order
      </p>

      <ul className={styles.techList}>{techs.map((tech) => techItem(tech))}</ul>
    </Container>
  </div>
)

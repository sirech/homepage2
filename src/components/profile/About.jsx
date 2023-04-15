import React from 'react'
import { Link } from 'gatsby'

import Container from '../Container'

const About = () => (
  <Container>
    <p>
      I develop software for a living, and then I go home and continue thinking
      about software because I just can&apos;t get enough.
    </p>
    <p>
      I&apos;m a full-stack engineer with infrastructure skills. I&apos;ve led
      multiple agile delivery teams, being an individual contributor, driving
      architecture topics, and coaching and supporting other team members.
    </p>
    <p>
      I believe in high-quality software and advocate for Continuous Delivery,
      Test Driven Development, and quick iteration. I{' '}
      <Link to="/blog">write</Link> and <Link to="/talks">speak</Link> about my
      experience regularly. Needless to say, all the opinions expressed in this
      blog are mine and only mine.
    </p>
  </Container>
)

export default About

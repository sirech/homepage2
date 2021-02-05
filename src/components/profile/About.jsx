import React from 'react'
import Link from 'gatsby-link'

import Container from '../Container'

const About = () => (
  <Container>
    <p>
      I develop software for a living. Then I go home and continue thinking
      about software because I just can&apos;t get enough. I started my career
      as a backend engineer. Later on I learned enough about frontend
      development to consider myself a fullstack developer. Lastly I became
      interested in infrastructure, and nowadays I feel confident in all three
      areas.
    </p>

    <p>
      I&apos;ve worked as a technical lead for the past few years. It took me a
      while to figure it out, but I really enjoy working on making a team more
      effective. I like helping others along their journey and establishing good
      practices within a team. I&apos;m a big advocate of Continuous Delivery
      and Test Driven Development, among others.
    </p>

    <p>
      I love sharing my knowledge. I write a lot about different technologies
      and practices. I&apos;ve done a whole bunch of talks in many different
      meetups and conferences.
    </p>

    <p>
      I avoid calling myself a <i>Technology X</i> developer. Nevertheless
      I&apos;ve worked with plenty of <Link to="/#techs">technologies</Link> and{' '}
      <Link to="/#tools">tools</Link>.
    </p>
  </Container>
)

export default About

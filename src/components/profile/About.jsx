import React from 'react'
import Link from 'gatsby-link'

import Container from '../Container'

export default () => (
  <Container>
    <p>
      I develop software for a living. Then I go home and continue reading about
      software because I just can't get enough. At some point, somebody thought
      it was a good idea to make me the technical lead of an agile team. I
      quickly discovered that building things myself is not the same as helping
      somebody else figure it out. I learned, somewhat to my surprise, that I
      really enjoy sharing ideas. According to their feedback, other developers
      have managed to learn something from me. At least they don't tend to run
      away screaming, which is, I think, a good thing.
    </p>

    <p>
      I have been working as a professional developer for more than ten years.
      If{' '}
      <a
        href="http://norvig.com/21-days.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Peter Norvig is correct
      </a>
      , I should know by now what I am doing, although I often get the feeling I
      don't know anything.
    </p>

    <p>
      I specialize in web programming. I started doing backend work, then I got
      more and more into frontend topics, and lately I have managed to touch
      infrastructure as well. I don't know if there is such a thing as a{' '}
      <b>Full Stack Developer</b>, but I definitely try to involve myself in all
      areas of software delivery.
    </p>

    <p>
      I have managed to work with plenty of{' '}
      <Link to="/#techs">technologies</Link> and <Link to="/#tools">tools</Link>
      . It took me a while to realize, though, that while reliable tech and good
      foundations are important, they are not the only thing needed to deliver
      high-quality software.
    </p>
  </Container>
)

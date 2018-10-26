import React from 'react'
import Link from 'gatsby-link'

import Container from '../Container'

export default () => (
  <Container>
    <p>
      I have been programming for a while already. Counting the time when I was
      studying, it has been over ten years already. If{' '}
      <a
        href="http://norvig.com/21-days.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Peter Norvig is correct
      </a>{' '}
      I should know by now what I am doing, although I often get the feeling I
      don't know anything.
    </p>

    <p>
      In this time I have been in a number of companies, mostly focused on web
      programming. I started as a developer, focused on backend topics. At some
      point I became frustrated having to wait for somebody else to implement
      the layouts, so I ended up learning HTML and CSS past the{' '}
      <i>random pixel assignment part</i>. I guess that qualifies me as a{' '}
      <b>Full Stack Developer</b>.
    </p>

    <p>
      At some point somebody thought it was a good idea to make me the technical
      lead of an agile team. I quickly discovered that building things yourself
      is not the same as helping somebody else figure it out. I learned,
      somewhat to my surprise, that I really enjoy sharing ideas. According to
      their feedback, other developers have managed to learn something from me.
      At least they don't tend to run away screaming, which is, I think, a good
      thing.
    </p>

    <p>
      I have managed to work with plenty of{' '}
      <Link to="#techs">technologies</Link> and <Link to="#tools">tools</Link>.
      It took my a while to realize, though, that while solid tech and good
      foundations are important, they are not the only thing needed to deliver
      high quality software.
    </p>
  </Container>
)

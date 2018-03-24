import React from 'react'
import Link from 'gatsby-link'

export default () => (
  <div className="container">
    <p>
      I have been programming for a while already. Counting the time when I was
      studying, it has been over ten years already. If{' '}
      <a href="http://norvig.com/21-days.html">Peter Norvig is correct</a> I
      should know by now what I am doing, although I often get the feeling I
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
      lead of a SCRUM team. I quickly discovered that it is not the same doing
      something yourself than helping somebody figure it out himself. I learned,
      somewhat to my surprise, that I really enjoy doing that, and that the
      people I have coached did as well. At least they don't tend to run away
      screaming from me, which is, I think, a good thing. Another consequence of
      this switch is that I have done a lot of interviewing in the last years.
    </p>

    <p>
      I have managed to work with plenty of{' '}
      <Link to="#techs">technologies</Link> and <Link to="#tools">tools</Link>.
      It took my a while to realize, though, that while solid tech and good
      foundations are important, they are not the only thing needed to deliver
      high quality software.
    </p>
  </div>
)

import React from 'react'

import standardHelmet from '../../util/standardHelmet'
import TalkList from '../../components/TalkList'
import Container from '../../components/Container'

class Talks extends React.Component {
  render() {
    return (
      <main>
        {standardHelmet({
          title: 'Talks',
          description:
            'I used to hate talking in front of people, but after doing presentations for a while, at some point I started to like it. Still have plenty to learn though.',
        })}
        <section className="horizontal-section">
          <Container>
            I used to hate talking in front of people, but after doing
            presentations for a while, at some point I started to like it. Still
            have plenty to learn though.
          </Container>
        </section>

        <section
          id="features"
          className="horizontal-section bg-dark text-white text-center"
        >
          <Container>
            <TalkList />
          </Container>
        </section>
      </main>
    )
  }
}

export default Talks

import get from 'lodash/get'
import React from 'react'

import standardHelmet from '../../util/standardHelmet'
import TalkList from '../../components/TalkList'

class Talks extends React.Component {
  render() {
    const pathPrefix =
      process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__
    return (
      <main>
        {standardHelmet({
          title: 'Talks',
          description:
            'I used to hate talking in front of people, but after doing presentations for a while, at some point I started to like it. Still have plenty to learn though.',
        })}
        <section className="horizontal-section">
          <div className="container">
            I used to hate talking in front of people, but after doing
            presentations for a while, at some point I started to like it. Still
            have plenty to learn though.
          </div>
        </section>

        <section
          id="features"
          className="horizontal-section bg-dark text-white text-center"
        >
          <div className="container">
            <TalkList />
          </div>
        </section>
      </main>
    )
  }
}

export default Talks

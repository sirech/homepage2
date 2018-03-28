import React from 'react'
import standardHelmet from '../util/standardHelmet'

import About from '../components/profile/About'
import Techs from '../components/profile/Techs'
import Tools from '../components/profile/Tools'

class Profile extends React.Component {
  render() {
    return (
      <div>
        {standardHelmet({
          title: 'About me',
          description:
            'I have been programming for a while already. Counting the time when I was studying, it has been over ten years already. If Peter Norvig is correct I should know by now what I am doing, although I often get the feeling I do not know anything.',
        })}
        <section class="horizontal-section">
          <About />
        </section>
        <section
          id="techs"
          className="horizontal-section bg-primary text-white"
        >
          <Techs />
        </section>
        <section id="tools" className="horizontal-section">
          <Tools />
        </section>
      </div>
    )
  }
}

export default Profile

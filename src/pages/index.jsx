import React from 'react'
import standardHelmet from '../util/standardHelmet'

import About from '../components/profile/About'
import Techs from '../components/profile/Techs'
import Tools from '../components/profile/Tools'

class Profile extends React.Component {
  render() {
    return (
      <div>
        {standardHelmet('About me')}

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

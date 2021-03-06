import React from 'react'
import StandardHelmet from '../util/StandardHelmet'

import About from '../components/profile/About'
import Techs from '../components/Techs'
import Tools from '../components/Tools'
import Footer from '../components/Footer'

class Profile extends React.Component {
  render() {
    return (
      <div>
        <main>
          {StandardHelmet({
            title: 'About me',
            description:
              'I have been programming for a while already. Counting the time when I was studying, it has been over ten years already. If Peter Norvig is correct I should know by now what I am doing, although I often get the feeling I do not know anything.',
          })}
          <section className="horizontal-section">
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
        </main>
        <Footer />
      </div>
    )
  }
}

export default Profile

import React from 'react'
import standardHelmet from '../util/standardHelmet'

import About from './profile/About'
import Techs from './profile/Techs'
import Tools from './profile/Tools'

class Profile extends React.Component {
  render() {
    return (
      <div>
        {standardHelmet('Profile')}

        <section>
          <About />
        </section>

        <section id="techs" className="bg-primary text-white">
          <Techs />
        </section>

        <section id="tools">
          <Tools />
        </section>

        <section
          id="links"
          className="bg-primary text-white text-center color-inverse"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center">
                <h2 className="section-heading">Links</h2>
              </div>
              <div className="col-md-6 text-left">
                <li>
                  <a className="text-dark" href="https://github.com/sirech">
                    Github Repositories
                  </a>
                </li>
                <li>
                  <a
                    className="text-dark"
                    href="https://stackoverflow.com/users/3785/mario-f"
                  >
                    Stackoverflow
                  </a>
                </li>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Profile

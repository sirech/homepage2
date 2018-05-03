import React from 'react'
import cx from 'classnames'

import styles from './style.module.scss'
import techs from './techList'

const techItem = ([title, name]) => (
  <div key={name} className="col-sm-3 col-6">
    <div
      className={cx(`${styles.serviceBox}`)}
      data-toggle="tooltip"
      data-placement="top"
      title={title}
    >
      <i
        className={`tech-icon devicon-${name}-plain`}
        data-emergence="hidden"
      />
    </div>
  </div>
)

export default () => (
  <div className="technologies">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="section-heading text-center">Technologies</h2>
          <hr className="border-white" />
          <p>
            Following the{' '}
            <a
              className="text-dark"
              href="https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
            >
              Pragmatic Programmer
            </a>{' '}
            advice, I try to learn some new technology every year. My github
            account is full of small projects I have started to teach myself new
            things, such as this page itself. A list of them, in no particular
            order
          </p>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row">{techs.map(tech => techItem(tech))}</div>
    </div>
  </div>
)

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import cx from 'classnames'

import { underline, icon } from './style.module.scss'

const links = [
  ['/', 'About'],
  ['/talks/', 'Talks'],
  ['/blog/', 'Blog'],
  ['/tags', 'Tags'],
]

class SiteNavi extends React.Component {
  link(url, name) {
    return (
      <li key={name} className="nav-item">
        <Link
          to={url}
          className={cx(underline, 'nav-link', {
            active: this.props.location.pathname === url,
          })}
        >
          {name}
        </Link>
      </li>
    )
  }

  render() {
    const { title } = this.props
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-dark px-3">
        <Link className="text-center" to="/">
          <h1 className="navbar-brand mb-0 me-sm-0 me-md-2">{title}</h1>
        </Link>
        <ul className="navbar-nav bd-navbar-nav flex-row">
          {links.map(([url, name]) => this.link(url, name))}
        </ul>
        <ul className="navbar-icons navbar-nav flex-row ms-md-auto d-md-flex">
          <li className={cx(`${icon}`, 'nav-item')}>
            <a href="/rss.xml" className="nav-link" aria-label="RSS Feed">
              <i className="fa fa-rss fa-lg" />
            </a>
          </li>
          <li className={cx(`${icon}`, 'nav-item')}>
            <a
              href="https://github.com/sirech"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <i className="fa fa-github-square fa-lg" />
            </a>
          </li>
          <li className={cx(`${icon}`, 'nav-item')}>
            <a
              href="https://stackoverflow.com/users/3785/mario-f"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="StackOverflow Profile"
            >
              <i className="fa fa-stack-overflow fa-lg" />
            </a>
          </li>
          <li className={cx(`${icon}`, 'nav-item')}>
            <a
              href="https://www.linkedin.com/in/mario-fernandez-9b9195a/"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <i className="fa fa-linkedin fa-lg" />
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

SiteNavi.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default SiteNavi

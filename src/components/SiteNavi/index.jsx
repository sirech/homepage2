import React from 'react'
import Link from 'gatsby-link'

const links = [['/', 'About'], ['/talks/', 'Talks'], ['/blog/', 'Blog']]

class SiteNavi extends React.Component {
  link(url, name) {
    return (
      <li
        key={name}
        className={
          this.props.location.pathname === url ? 'nav-item active' : 'nav-item'
        }
      >
        <Link to={url} className="nav-link">
          {name}
        </Link>
      </li>
    )
  }

  render() {
    const { title } = this.props
    return (
      <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bg-dark">
        <Link className="text-center" to="/">
          <h1 className="navbar-brand mb-0 mr-sm-0 mr-md-2">{title}</h1>
        </Link>
        <div className="navbar-nav-scroll">
          <ul className="navbar-nav bd-navbar-nav flex-row">
            {links.map(([url, name]) => this.link(url, name))}
          </ul>
        </div>
        <ul className="navbar-nav flex-row ml-md-auto d-md-flex">
          <li className="nav-item">
            <a
              href="https://github.com/sirech"
              className="nav-link"
              target="_blank"
              aria-label="StackOverflow Profile"
            >
              <i className="fa fa-github-square fa-lg" />
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://stackoverflow.com/users/3785/mario-f"
              className="nav-link"
              target="_blank"
              aria-label="StackOverflow Profile"
            >
              <i className="fa fa-stack-overflow fa-lg" />
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default SiteNavi

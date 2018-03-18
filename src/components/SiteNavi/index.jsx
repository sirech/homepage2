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
        <div className="container">
          <Link className="text-center" to="/">
            <h1 className="navbar-brand mb-0">{title}</h1>
          </Link>
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              {links.map(([url, name]) => this.link(url, name))}
            </ul>
          </div>
          <div className="navbar-nav flex-row ml-md-auto d-none d-md-flex" />
        </div>
      </nav>
    )
  }
}

export default SiteNavi

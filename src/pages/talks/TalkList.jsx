import React from 'react'
import talks from './talks'

const talkItem = ([url, title]) => (
  <li key={title} className="list-group-item">
    <a key={title} href={url}>
      {title}
    </a>
  </li>
)

export default () => (
  <ul className="list-group">{talks.map(talk => talkItem(talk))}</ul>
)

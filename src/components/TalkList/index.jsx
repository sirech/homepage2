import React from 'react'
import PropTypes from 'prop-types'

import { groupedTalks } from './talks'

const TalkItem = ({ url, title }) => (
  <li key={title} className="list-group-item">
    <a key={title} href={url}>
      {title}
    </a>
  </li>
)

TalkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const TalkList = ({ list }) => (
  <div className="mb-3">
    <h2>{list[0].year}</h2>
    <ul className="list-group">{list.map((talk) => TalkItem(talk))}</ul>
  </div>
)

TalkList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

const GroupedTalkList = () => {
  const groups = groupedTalks()

  return (
    <section>
      {groups.map((list, idx) => (
        <TalkList key={idx} list={list} />
      ))}
    </section>
  )
}

export default GroupedTalkList

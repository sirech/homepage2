import { sort, uniq } from 'ramda'

import { groupedTalks } from './talks'

describe('groupedTalks', () => {
  const subject = groupedTalks()

  it('splits the talks in years', () => {
    subject.map((list) => {
      const years = uniq(list.map((elem) => elem.year))
      expect(years).toHaveLength(1)
    })
  })

  it('returns the years sorted in reverse order', () => {
    const years = subject.map((l) => l[0].year)
    expect(years.reverse()).toEqual(sort((a, b) => a - b, years))
  })
})

import groupTags from './group-tag'

describe('groupTags', () => {
  const group = [
    { tag: 'AWS', count: 6 },
    { tag: 'Architecture', count: 2 },
    { tag: 'Kubernetes', count: 25 },
    { tag: 'React', count: 1 },
    { tag: 'Angular', count: 1 },
  ]

  it('extracts top tags', () => {
    const { top } = groupTags(group, 2)
    expect(top).toEqual([
      { tag: 'Kubernetes', count: 25 },
      { tag: 'AWS', count: 6 },
    ])
  })

  it('leaves other tags', () => {
    const { other } = groupTags(group, 3)
    expect(other).toEqual([
      { tag: 'React', count: 1 },
      { tag: 'Angular', count: 1 },
    ])
  })
})

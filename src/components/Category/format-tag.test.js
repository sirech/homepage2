import formatTag from './format-tag'

describe('formatTag', () => {
  it('downcases the tag', () => {
    expect(formatTag('React')).toEqual('react')
  })

  it('converts it to kebabCase', () => {
    expect(formatTag('SSL Certificate')).toEqual('ssl-certificate')
  })
})

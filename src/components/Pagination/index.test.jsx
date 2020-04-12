import React from 'react'
import renderer from 'react-test-renderer'
import Pagination from './index'

describe('components', () => {
  describe('Pagination', () => {
    it('renders correctly', () => {
      const component = renderer.create(<Pagination index={3} pageCount={5} />)
      expect(component.toJSON()).toMatchSnapshot()
    })

    it('renders correctly if it links to the first page', () => {
      const component = renderer.create(<Pagination index={2} pageCount={5} />)
      expect(component.toJSON()).toMatchSnapshot()
    })

    it('disables back link if we are on the first page', () => {
      const component = renderer.create(<Pagination index={1} pageCount={5} />)
      expect(component.toJSON()).toMatchSnapshot()
    })

    it('disables next link if we are on the last page', () => {
      const component = renderer.create(<Pagination index={5} pageCount={5} />)
      expect(component.toJSON()).toMatchSnapshot()
    })

    it('only renders if there are multiple pages', () => {
      const component = renderer.create(<Pagination index={1} pageCount={1} />)
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})

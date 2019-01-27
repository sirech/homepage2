import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Pagination from './index'

describe('components', () => {
  describe('Pagination', () => {
    it('renders correctly', () => {
      const component = shallow(<Pagination index={3} pageCount={5} />)
      expect(toJson(component)).toMatchSnapshot()
    })

    it('renders correctly if it links to the first page', () => {
      const component = shallow(<Pagination index={2} pageCount={5} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

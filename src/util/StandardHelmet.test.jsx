import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import StandardHelmet from './StandardHelmet'

describe('components', () => {
  describe('StandardHelmet', () => {
    it('renders correctly', () => {
      const component = shallow(
        <StandardHelmet title="the title" description="the description" />
      )
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

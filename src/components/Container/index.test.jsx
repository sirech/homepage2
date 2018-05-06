import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Container from './index'

describe('components', () => {
  describe('Container', () => {
    it('renders correctly', () => {
      const component = shallow(
        <Container>
          <p>Text</p>
        </Container>
      )
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

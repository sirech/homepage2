import React from 'react'
import { shallow } from 'enzyme'
import HTML from './HTML'
import Helmet from 'react-helmet'

describe('components', () => {
  beforeEach(() => {
    Helmet.canUseDOM = false
  })

  describe('HTML', () => {
    it('renders correctly', () => {
      const component = shallow(<HTML />)
      expect(component).toHaveLength(1)
    })
  })
})

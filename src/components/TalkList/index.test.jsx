import React from 'react'
import { shallow } from 'enzyme'
import TalkList from './index'

describe('components', () => {
  describe('TalkList', () => {
    it('renders correctly', () => {
      const component = shallow(<TalkList />)
      expect(component).toHaveLength(1)
    })
  })
})

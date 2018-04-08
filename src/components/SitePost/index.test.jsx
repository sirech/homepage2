import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SitePost from './index'

describe('components', () => {
  describe('SitePost', () => {
    it('renders correctly', () => {
      const frontmatter = {
        categories: ['JavaScript', 'React'],
        date: '2018/03/01',
        layout: 'post',
        path: '/the-post',
        title: 'My Post',
      }
      const data = { html: '<div>content</div>', frontmatter }
      const component = shallow(<SitePost data={data} />)
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})

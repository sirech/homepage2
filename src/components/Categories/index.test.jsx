import React from 'react'
import renderer from 'react-test-renderer'
import Categories from './index'

describe('components', () => {
  describe('Categories', () => {
    it('renders correctly', () => {
      const component = renderer.create(
        <Categories categories={['React', 'SpringBoot', 'SSL Certificates']} />
      )
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
})

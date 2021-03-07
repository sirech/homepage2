import React from 'react'
import { render, screen } from '@testing-library/react'
import Pagination from './index'

describe('components', () => {
  describe('Pagination', () => {
    it('renders correctly', () => {
      const { asFragment } = render(
        <Pagination index={3} pageCount={5} pathPrefix="blog" />
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders correctly if it links to the first page', () => {
      render(<Pagination index={2} pageCount={5} pathPrefix="blog" />)

      const first = screen.getAllByRole('link')[0]
      expect(first.href).toMatch(/\/blog\/$/)
    })

    it('disables back link if we are on the first page', () => {
      render(<Pagination index={1} pageCount={5} pathPrefix="blog" />)

      const first = screen.getAllByRole('listitem')[0]
      expect(first).toHaveClass('disabled')
    })

    it('disables next link if we are on the last page', () => {
      render(<Pagination index={5} pageCount={5} pathPrefix="blog" />)

      const elements = screen.getAllByRole('listitem')
      const last = elements[elements.length - 1]
      expect(last).toHaveClass('disabled')
    })

    it('only renders if there are multiple pages', () => {
      render(<Pagination index={1} pageCount={1} pathPrefix="blog" />)

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    it('can customize the path prefix', () => {
      render(
        <Pagination
          index={2}
          pageCount={2}
          pathPrefix="blog/tags/book-review"
        />
      )

      const first = screen.getAllByRole('link')[0]
      expect(first.href).toMatch(/\/blog\/tags\/book-review\/$/)
    })
  })
})

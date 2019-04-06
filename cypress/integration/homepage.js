describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the menu bar', () => {
    cy.get('nav')
      .should('contain', 'About')
      .and('contain', 'Talks')
      .and('contain', 'Blog')
  })

  it('has a license', () => {
    cy.get('footer').contains('CC-by-4.0')
  })
})

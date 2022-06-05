describe('Talks', () => {
  beforeEach(() => {
    cy.visit('/talks')
  })

  it('has a list of talks', () => {
    cy.get('#features section').should('not.be.empty')
  })
})

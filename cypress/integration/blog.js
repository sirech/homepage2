describe('Blog', () => {
  beforeEach(() => {
    cy.visit('/blog')
  })

  it('has a list of blogposts', () => {
    cy.get('article').should('not.be.empty')
  })
})

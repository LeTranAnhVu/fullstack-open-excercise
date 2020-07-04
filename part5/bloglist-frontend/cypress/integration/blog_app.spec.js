describe('Blog app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.clearLocalStorage()
    cy.contains('login')
    cy.get('form')
    cy.get('input[name=username]')
    cy.get('input[name=password]')
    cy.get('button').contains('login')
  })
})
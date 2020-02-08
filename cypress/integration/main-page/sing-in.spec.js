describe('Sign in on main page', function () {
  it('Should redirect to sign in page', function () {
    cy.visit('http://localhost:1337')
    cy.contains('Sign in').click()
    cy.url().should('include', '/login')
  });
});

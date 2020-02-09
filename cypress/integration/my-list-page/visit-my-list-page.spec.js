describe('Visit my list page', function () {
  beforeEach(function () {
    cy.login();
  });
  it('should redirect to my list page from main page', function () {
    cy
      .get('.user-block')
      .find('a')
      .should('have.attr', 'href', '/mylist')
      .click();

    cy.url().should('include', '/mylist')
  });
});

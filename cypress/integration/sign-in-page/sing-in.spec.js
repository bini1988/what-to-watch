describe('Sign in on login page', function () {
  beforeEach(function () {
    cy.visit('/login');
  });
  it('greets with Sign in', function () {
    cy
      .get('.page-title')
      .should('have.text', 'Sign in');
  });
  it('links to main page', function () {
    cy
      .get('.logo')
      .find('.logo__link')
      .should('have.attr', 'href', '/');
  });
  it('requires email', function () {
    cy
      .get('.sign-in')
      .find('.sign-in__btn[type=submit]')
      .click();
    cy
      .get('.sign-in')
      .find('.sign-in__input[name=user-email]')
      .should('have.focus')
  });
  it('login user', function () {
    cy
      .get('.sign-in')
      .find('.sign-in__input[name=user-email]')
      .type('test-user@email.ru');
    cy
      .get('.sign-in')
      .find('.sign-in__input[name=user-password]')
      .type('password');
    cy
      .get('.sign-in')
      .find('.sign-in__btn[type=submit]')
      .click();

    cy
      .url()
      .should('eq', Cypress.config().baseUrl + '/');
    cy
      .get('.user-block')
      .should('exist');
  });
});

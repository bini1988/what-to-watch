// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('uilogin', () => {
  cy.visit('/login');
  cy
    .get('.sign-in__input[name=user-email]')
    .type('test-user@email.ru');
  cy
    .get('.sign-in__input[name=user-password]')
    .type('password');
  cy
    .get('.sign-in__btn[type=submit]')
    .click();
  cy
    .url()
    .should('eq', Cypress.config().baseUrl + '/');
});

Cypress.Commands.add('login', () => {
  cy.request({
      method: 'POST',
      url: 'https://es31-server.appspot.com/wtw/login',
      body: {"email":"test-user@email.ru","password":"password"},
    }).then(() => {
      cy.visit('/');
    });
});

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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('registerUser', (firstName, lastName, email, password) => {
    cy.visit('localhost:3000');
    cy.get(':nth-child(1) > .profile-login-register-btn').click();
    cy.get(':nth-child(1) > input').type(firstName);
    cy.get(':nth-child(2) > input').type(lastName);
    cy.get(':nth-child(3) > input').type(email);
    cy.get(':nth-child(4) > input').type(password);
    cy.get(':nth-child(5) > input').type(password);
    cy.get('button').click();
    cy.url().should('include', '/login');
    
  });
  Cypress.Commands.add('registerUser2', (firstName, lastName, email, password,password2) => {
    cy.visit('localhost:3000');
    cy.get(':nth-child(1) > .profile-login-register-btn').click();
    cy.get(':nth-child(1) > input').type(firstName);
    cy.get(':nth-child(2) > input').type(lastName);
    cy.get(':nth-child(3) > input').type(email);
    cy.get(':nth-child(4) > input').type(password);
    cy.get(':nth-child(5) > input').type(password2);
    cy.get('button').click();
    cy.url().should('include', '/register');
  });
  
  
  Cypress.Commands.add('loginUser', (email, password) => {
    cy.visit('localhost:3000');
    cy.get(':nth-child(2) > .profile-login-register-btn').click();
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button').click();
  });
  Cypress.Commands.add('loadProfile', () => {
    cy.url().should('include', '/profile');
    cy.get('.desc-cont').should('be.visible');
    cy.get('h3').should('contain', 'Krystian Figurski');
    cy.get('p').should('be.visible');
    cy.get('.edit-profile-btn').should('be.visible');
    cy.get('.events-title').should('contain', 'Twoje wydarzenia');
    cy.get('.hobbies-first-row > h2').should('contain', 'Zainteresowania');
    cy.get('.events-profile-card').should('be.visible');
    cy.get('.hobbies-first-row').should('be.visible');
    cy.get('.hobbies-second-row').should('be.visible');
  });
  
  
 
  
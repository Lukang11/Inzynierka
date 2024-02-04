describe('ChatPage Component Tests', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/chat'); 
  });


  it('renders all sub-components', () => {
    cy.get('.chat-clouds').should('be.visible');
    cy.get('.chat-messages-section').should('be.visible');
    cy.get('.new-chat-btn').should('be.visible');
    cy.get('.chat-types').should('be.visible');
  });
});
describe('ChatClouds Component Tests', () => {
  beforeEach(() => {
    cy.loginUser('1@gmail.com', 'P@ssw0rd');
    cy.get(':nth-child(4) > a').click();
  });

  it('displays messages in chat clouds correctly', () => {
    cy.get('.chat-clouds',{timeout:100000}).should('have.length.greaterThan', 0);
    cy.get(':nth-child(2) > .chat-item').click();
    cy.get('.chat-message').should('be.visible');

  });
  it('Should display chat clouds', () => {
    cy.get('.chat-clouds').should('be.visible');
  });
});

describe('ChatNewMessage Component Tests', () => {
  beforeEach(() => {
    cy.loginUser('1@gmail.com', 'P@ssw0rd');
    cy.get(':nth-child(4) > a').click();
  });
  it('should open new message modal', () => {
    cy.get('.new-chat-btn').click();
    cy.get('.modal').should('be.visible');
    cy.get('.message-modal-h2').should('be.visible').and('contain', 'Wpisz email użytkownika');
    cy.get('.modal-email-input').should('be.visible');
    cy.get('.modal-user-found').should('be.visible');
    cy.get('.modal-search-button').should('be.visible').and('contain', 'Szukaj');
    
  });
  it('should search for user', () => {
    cy.get('.new-chat-btn').click();
    cy.get('.modal-email-input').type('areczek@gmail.com ');
    cy.get('.modal-search-button').click();
    cy.get('.modal-user-as-button').should('be.visible');
  });
  it('should display user not found message', () => {
    cy.get('.new-chat-btn').click();
    cy.get('.modal-email-input').type(' ');
    cy.get('.modal-search-button').click();
    cy.get('.modal-user-found').should('be.visible').and('contain', 'Nie znaleziono');
  });
});
describe('ChatTypes Component Tests', () => {
  beforeEach(() => {
    cy.loginUser('1@gmail.com', 'P@ssw0rd');
    cy.get(':nth-child(4) > a').click();
  });

  it('allows chat type selection', () => {
    cy.get('.chat-types > :nth-child(2)').click();
    cy.get('.chat-clouds',{timeout:100000}).should('have.length.greaterThan', 0);
    cy.get('.chat-types > :nth-child(1)').click();
    cy.get('.chat-clouds',{timeout:100000}).should('have.length.greaterThan', 0);

    
    
  });
});
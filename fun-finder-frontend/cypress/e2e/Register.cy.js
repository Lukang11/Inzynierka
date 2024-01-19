describe('Registration functionality', () => {
  it('Register new user', () => {
    cy.registerUser('Siemel', 'Siemelski', 'siemel3@o2.pl', 'P@ssw0rd');
  });
  it('Should not register user with the same email', () => {
    cy.registerUser2('Siemel', 'Siemelski', 'siemel11@o2.pl', 'P@ssw0rd');
  });
  it('Should not register user with wrong email', () => {
      cy.registerUser2('Siemel', 'Siemelski', 'testwr@ongmail', 'P@ssw0rd');
      cy.get('.error-message').should('be.visible');
      
  
  });
  it('Should not register user with wrong password', () => {
    cy.registerUser2('Siemel', 'Siemelski', 'beczka123@o2.pl', 'haslo');
    cy.get('.error-message').should('be.visible');
  });

});


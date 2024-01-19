describe('Login functionality', () => {
  it(' should login registred user', () => {
    cy.loginUser('1234@gmail.com', 'P@ssw0rd');
    cy.url().should('include', '/profile');
  })
  it(' should not login user with wrong password', () => {
    cy.loginUser('1234@gmail.com', 'P@ssw0rd1');
    cy.get('.login-error-message').should('be.visible');
  })
  it(' should not login user with wrong email', () => {
    cy.loginUser('toniejestmail@napewnonie', 'P@ssw0rd');
    cy.get('.login-error-message').should('be.visible');
  })
})
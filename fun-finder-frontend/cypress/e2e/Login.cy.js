describe('Login functionality', () => {
  it("Should display Google login button", () => {
    cy.visit('localhost:3000/login')
    cy.get(".google-login-button").should("be.visible");
  });
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
  it("Should stay on login page after failed login attempt", () => {
    cy.visit('localhost:3000/login')
    cy.get('input[id="email"]').type("user@example.com");
    cy.get('input[id="password"]').type("wrongPassword");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/login");
  });
  it("Should show an error message for invalid email format", () => {
    cy.visit('localhost:3000/login')
    cy.get('input[id="email"]').type("invalidemail");
    cy.get('input[id="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.get(".login-error-message").should("contain", "Nieprawidłowy format adresu email.");
  });
})
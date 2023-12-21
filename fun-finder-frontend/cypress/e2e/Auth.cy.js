describe('Registration functionality', () => {
  it('Register new user', () => {
    cy.visit('localhost:3000')
    cy.get(':nth-child(1) > .profile-login-register-btn').click()
    cy.get(':nth-child(1) > input').type('Siemel')
    cy.get(':nth-child(2) > input').type('Siemelski')
    cy.get(':nth-child(3) > input').type('siemel11@o2.pl')
    cy.get(':nth-child(4) > input').type('P@ssw0rd')
    cy.get(':nth-child(5) > input').type('P@ssw0rd')
    cy.get('button').click()
  })
})
describe('Login functionality', () => {
  it('Login user', () => {
    cy.visit('localhost:3000')
    cy.get(':nth-child(2) > .profile-login-register-btn').click()
    cy.get('#email').type('siemel11@o2.pl')
    cy.get('#password').type('P@ssw0rd')
    cy.get('button').click()


  })
})
describe('Registration form validation', () => {
  it('Show error when email is not provided', () => {
    cy.visit('localhost:3000')
    cy.get(':nth-child(1) > .profile-login-register-btn').click()
    cy.get(':nth-child(1) > input').type('Siemel')
    cy.get(':nth-child(2) > input').type('Siemelski')
    cy.get(':nth-child(4) > input').type('P@ssw0rd')
    cy.get(':nth-child(5) > input').type('P@ssw0rd')
    cy.get('button').click()
    cy.get('.error-message').should('contain', 'Wszystkie pola są wymagane')
  })
})
describe('Registration form validation', () => {
  it('Show error when passwords do not match', () => {
    cy.visit('localhost:3000')
    cy.get(':nth-child(1) > .profile-login-register-btn').click()
    cy.get(':nth-child(1) > input').type('Siemel')
    cy.get(':nth-child(2) > input').type('Siemelski')
    cy.get(':nth-child(3) > input').type('siemel11@o2.pl')
    cy.get(':nth-child(4) > input').type('P@ssw0rd')
    cy.get(':nth-child(5) > input').type('DifferentPassword')
    cy.get('button').click()
    cy.get('.error-message').should('contain', 'Hasła nie pasują do siebie')
  })
})
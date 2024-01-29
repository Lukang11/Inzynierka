const uniqueEmail = `testuser${Date.now()}@example.com`;

describe("Registration functionality", () => {
  it("Register new user", () => {
    cy.registerUser("Siemel", "Siemelski", uniqueEmail, "P@ssw0rd");
  });
  it("Should not register user with the same email", () => {
    cy.registerUser2("Siemel", "Siemelski", "siemel11@o2.pl", "P@ssw0rd","P@ssw0rd");
  });
  it("Should not register user with wrong email", () => {
    cy.registerUser2("Siemel", "Siemelski", "testwr@ongmail", "P@ssw0rd","P@ssw0rd");
    cy.get(".error-message").should("be.visible");
  });
  it("Should not register user with wrong password", () => {
    cy.registerUser2("Siemel", "Siemelski", "beczka123@o2.pl", "haslo","haslo");
    cy.get(".error-message").should("be.visible");
  });
  it("Should display a warning for weak password", () => {
    cy.registerUser2("Jan", "Kowalski", "jan@example.com", "weak");
    cy.get(".error-message").should("contain", "Hasło nie jest wystarczająco silne.");
  });
  it("Should not allow registration with empty fields", () => {
    cy.visit("localhost:3000/register");
    cy.get("form").within(() => {
      cy.get("input[name='fname']").clear();
      cy.get("input[name='lname']").clear();
      cy.get("input[name='email']").clear();
      cy.get("input[name='password']").clear();
      cy.get("input[name='confirmPassword']").clear();
      cy.get("button[type='submit']").click();
    });
    cy.get(".error-message").should("contain", "Wszystkie pola są wymagane.");
  });
  it("Should not register user if passwords do not match", () => {
    cy.registerUser2("Jan", "Kowalski", "jan@example.com", "P@ssw0rd", "DifferentPassword");
    cy.get(".error-message").should("contain", "Hasła nie pasują do siebie.");
  });
  
  it("Should not register user with invalid email format", () => {
    cy.registerUser2("Jan", "Kowalski", "invalidemail", "P@ssw0rd", "P@ssw0rd");
    cy.get(".error-message").should("contain", "Nieprawidłowy adres email.");
  });
  
});

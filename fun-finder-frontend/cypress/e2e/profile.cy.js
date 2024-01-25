describe("Profile functionality", () => {
  it("User should see his profile after login", () => {
    cy.loginUser("1234@gmail.com", "P@ssw0rd");
    cy.loadProfile();
  });
  it("User should edit his profile", () => {
    cy.loginUser("1234@gmail.com", "P@ssw0rd");
    cy.loadProfile();
    cy.get(".edit-profile-btn").click();
    cy.get("#description").type("Test description");
    cy.get(".profile-save-btn").click();
    cy.get(".desc-cont").should("contain", "Test description");
    cy.get(".hobbies-add-button").click();
    cy.get(".hobbies-item-wrapper > :nth-child(3)").click();
    cy.get(".hobbies-item-wrapper > :nth-child(8)").click();
    cy.get(".modal-send-btn").click();
    cy.get(".close-modal").click();
    cy.get(".hobbies-contener-wrapper").should(
      "contain",
      "Gotowanie",
      "Motoryzacja"
    );
  });
});

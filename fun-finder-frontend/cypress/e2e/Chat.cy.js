describe('ChatClouds Component Tests', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/login')
        cy.loginUser('1234@gmail.com', 'P@ssw0rd');
        cy.get(':nth-child(3) > a').click()
    });
  
    it('should display chat clouds', () => {
      // Assuming chat clouds are listed in a specific class or element type
      cy.get('.chat-clouds').should('be.visible');
    });
  
    it('should select a chat cloud and display its messages', () => {
      // This test assumes clicking on a chat cloud shows its messages
      // Adjust the selector as per the actual implementation
      cy.get('.chat-clouds-list .chat-cloud-item').first().click();
      cy.get('.chat-messages').should('be.visible');
    });
  });


describe('EventBattlerView Component Tests', () => {
    beforeEach(() => {
      cy.loginUser('1@gmail.com','P@ssw0rd')
      cy.get(':nth-child(2) > a').click();
    });
  
    it('renders the EventBattlerView component', () => {
      cy.get('.event-battler-container').should('be.visible');
      cy.get('.event-battler-rooms').should('be.visible');
      cy.get('.create-group-button').should('be.visible');
      cy.get('.refresh-button').should('be.visible');
      cy.get('.event-battler-H2').should('be.visible');
    });
  
    it('displays rooms data or "Brak aktywnych pokoi" message', () => {
   
      cy.get('.event-battler-no-rooms-info').should('be.visible'); 
      cy.get('.event-battler-item').should('have.length.greaterThan', 0);
    });
  
    it('opens the Create Room modal when "Stwórz pokój" button is clicked', () => {
      cy.get('.create-group-button').click();
      cy.get('.event-battler-modal-content').should('be.visible').and('contain', 'Stwórz pokój');
      cy.get('form').should('be.visible');
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[type="button"]').should('be.visible');
     
    });
  
    it('closes the Create Room modal when closed', () => {
      cy.get('.create-group-button').click();
      cy.get('.event-battler-modal-close-button').click({force:true}); 
      cy.get('.event-battler-modal-content').should('not.exist');
    });
  
    it('clicks the "Odśwież" button and refreshes the rooms data', () => {
      
      cy.get('.refresh-button').click();
      
      cy.get('.event-battler-item-cont').should('have.length.greaterThan', 0);
    });
  
   
});
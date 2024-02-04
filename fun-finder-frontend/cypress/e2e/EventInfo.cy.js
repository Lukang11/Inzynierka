describe('EventInfo Component Tests', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:7000/events/by-id/*', { fixture: 'eventData.json' }).as('fetchEventData');
      cy.visit('localhost:3000/event-info/*'); 
    });
  
    it('loads and displays event data correctly', () => {
      cy.wait('@fetchEventData');
      cy.get('.event-name').should('contain', 'test event');
      cy.get('.event-address').should('contain', 'Świętego Ducha 64, 80-834 Gdańsk, Polska');
      cy.get('.event-information').should('contain', 'This is a test event description');
    });
    it('loads Google Map with correct marker', () => {
        cy.wait('@fetchEventData');
        cy.get('.event-map').should('be.visible');
        cy.get('[style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"] > div > img').should('be.visible');
      });
  });
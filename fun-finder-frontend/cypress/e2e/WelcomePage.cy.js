
describe('WelcomePage Component Tests', () => {
    beforeEach(() => {
      cy.visit('localhost:3000'); 
    });
  
    it('renders the WelcomePage component', () => {
      cy.get('.first-section').should('be.visible');
      cy.get('.second-section').should('be.visible');
      cy.get('.third-section').should('be.visible');
      cy.get('.footer').should('be.visible');
    });
  
    it('scrolls to the second section when "Dowiedz się więcej" button is clicked', () => {
      cy.get('.section-outline-btn').click();
      cy.get('.second-section').should('be.visible'); 
    });
  
    it('navigates to the registration page when "Stwórz konto" button is clicked', () => {
      cy.get('.section-filled-btn').click();
      cy.url().should('include', '/register');
    });
  
    it('displays cards with data in the second section', () => {
      cy.get('.cards-container').should('be.visible'); 
      cy.get('.card').should('have.length.greaterThan', 0); 
    });
  
  });
  
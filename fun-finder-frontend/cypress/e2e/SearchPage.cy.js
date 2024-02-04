describe('SearchPage Component Tests', () => {
    beforeEach(() => {
      cy.loginUser('1@gmail.com','P@ssw0rd',{ timeout: 10000 })
      cy.get('.flex-cont > :nth-child(1) > a').click();
     
    });
  
    it('renders search input and allows typing', () => {
        cy.get('#search')
        .should('be.visible')
        .type('Test')
        .should('have.value', 'Test');
    });
  
    it('filters results based on category selection', () => {
     cy.get('#search').type('a')
     cy.get('select').select('Motoryzacja');
     
    });
  
    it('opens and closes the SPUserModal with correct data', () => {
        cy.get('#search').type('A')
      
       cy.get(':nth-child(1) > .user-card-item > .info-box').click();
        cy.get('.sp-modal-bg').should('be.visible')
        cy.get('.sp-modal-fullname').should('be.visible')
        cy.get('.sp-modal-desc').should('be.visible')
        cy.get('.sp-modal-contact-btn').should('be.visible')
    
    });
    it('closes when the close button is clicked', () => {
        cy.get('#search').type('A')
        cy.get(':nth-child(1) > .user-card-item > .info-box').click();
        cy.get('.close-profile-modal').click();
        cy.get('.sp-modal-wrapper').should('not.exist'); 

      });
      it ('should find user and create new chat', () => {
        cy.loginUser('1@gmail.com', 'P@ssw0rd');
        cy.get('.search-input').type('Z');
    
  
    
  });
  
describe('SPUserModal Component Tests', () => {
    beforeEach(() => {
        cy.loginUser('1@gmail.com','P@ssw0rd',{ timeout: 10000 })
        cy.get('.flex-cont > :nth-child(1) > a').click();
    });
  
    it('opens with correct user data', () => {
      cy.get('#search').type('A')
      cy.get(':nth-child(1) > .user-card-item > .info-box').click(); 
        cy.get('.sp-modal-bg') 
        .should('be.visible')
        cy.get('img').should('be.visible')
        cy.get('.sp-modal-fullname').should('be.visible').and('contain', 'Adam Kowalski');
        cy.get('.sp-modal-desc').should('be.visible').and('contain','Jeszcze nie ustawiono opisu')
        cy.get('.sp-modal-hobbies').should('be.visible').and('contain','Motoryzacja')
    });
    it('should open new chat after clicking contact button', () => {
      cy.get('#search').type('A')
      cy.get(':nth-child(1) > .user-card-item > .info-box').click(); 
      cy.get('.sp-modal-contact-btn').click();
      cy.url().should('include', '/chat');
      



    });
  
    describe('UserCard Component Tests', () => {
      
        it('renders with correct data', () => {
          cy.get('#search').type('A')
          cy.get(':nth-child(1) > .user-card-item > .info-box').should('be.visible')
          cy.get(':nth-child(1) > .user-card-item > .info-box > .item-fullname').should('be.visible').and('contain', 'Adam Kowalski');
           
        });
      
      });
    });
   
    
  });

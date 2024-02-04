describe('CreateEvent Component Tests', () => {
  beforeEach(() => {
    cy.loginUser('1234@gmail.com', 'P@ssw0rd');
    cy.get(':nth-child(3) > a').click();
    cy.get('.events-button-add-events').click();
    
  });

  it('should render all form elements', () => {
    cy.get('.events-header').should('contain', 'Dodaj wydarzenie');
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="datetime-local"]').should('exist');
    cy.get('input[type="number"]').should('exist');
    cy.get('textarea').should('exist');
    cy.get('.create-eventt-button').should('exist');
  });

  it('should show error messages for empty required fields on submit', () => {
    cy.get('.create-eventt-button').click();
    cy.get('.input-error').should('have.length', 7); 
    
  });

  it('should allow text input and show no error for valid inputs', () => {
    cy.get('input[type="text"]').first().type('Test Event');
    cy.get('.input-error').should('not.exist');
  });

  it('should select a category and highlight it', () => {
    cy.get('.category-item').first().click();
    cy.get('.selected').should('exist');
  });

  it('should load and interact with Google Map', () => {
    cy.get('.gm-style', { timeout: 10000 }).should('exist');
    cy.get('.gm-style img').should('exist'); //sprawdza marker
    cy.get('area[title="Twoja lokalizacja"]').should('exist');
    cy.get('[placeholder="Podaj adres wydarzenia"]',{ timeout: 10000 }).type('Edwarda Stachury 1 Gdańsk {enter}' )
    cy.get('.gm-style img').should('exist'); //sprawdza marker
    cy.get('area[title="Twoja lokalizacja"]').should('exist');

  });

  it('should submit form with valid data', () => {
    
    cy.get(':nth-child(1) > [type="text"]').type('Test Event');
    cy.get('[placeholder="Podaj datę rozpoczęcia"]').type('2024-06-01T12:00');
    cy.get('[placeholder="Podaj datę zakończenia"]').type('2024-06-01T13:00');
    cy.get('[type="number"]').type('10');
    cy.get('[placeholder="Napisz coś o swoim wydarzeniu"]').type('Test description');
    cy.get('[placeholder="Podaj adres wydarzenia"]',{ timeout: 10000 }).type('Gdynia Hutnicza 44 {enter}' );
    cy.get('[placeholder="Dodaj URL zdjęcia"]').type('https://picsum.photos/200/300');
    cy.get('.category-item').first().click();

  

    cy.get('.create-eventt-button').click();
    cy.url().should('include', '/events');
    
  });


});
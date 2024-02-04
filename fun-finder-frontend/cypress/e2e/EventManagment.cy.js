describe('E2E Scenarios', () => {
    it('should register user on event, button should change on disabled and display event on profile section and add ', () => {
        cy.loginUser('1@gmail.com','P@ssw0rd');
        cy.intercept('GET', 'http://localhost:7000/events/by-id/*', { fixture: 'eventData.json' }).as('fetchEventData');
        cy.get(':nth-child(3) > a').click();
        cy.intercept('GET', 'http://localhost:7000/events', {
      fixture: 'events.json'
    }).as('getEvents');
    cy.wait('@getEvents');
        cy.get(':nth-child(2) > .all-events-component > :nth-child(1)').click();
        cy.intercept('GET', 'http://localhost:7000/events/by-id/*', { fixture: 'eventData.json' }).as('fetchEventData');
        cy.wait('@fetchEventData');
        cy.get('.register-on-event-button').click();
        cy.get('.register-on-event-button').should('be.disabled');
        cy.get('.profile-login-register-btn').click();
        cy.get(':nth-child(2) > a > .cell-container').should('be.visible').and('contain', 'test event');

    });
    it('should create event and add user to it  , display it on events section, and create event chat ', () => {
        cy.loginUser('1@gmail.com','P@ssw0rd');
        cy.get(':nth-child(3) > a').click();
        cy.get('.events-button-add-events').click();
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
        cy.get(':nth-child(2) > .all-events-component').should('be.visible').and('contain', 'Test Event');
        cy.get(':nth-child(4) > a').click();
        cy.get('.chat-types > :nth-child(2)').click();
        cy.get('.chat-clouds').should('contain', 'Test Event');

    });
        









});

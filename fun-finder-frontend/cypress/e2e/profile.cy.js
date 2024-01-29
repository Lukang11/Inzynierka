describe('HobbiesModal Component Tests', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login')
    cy.loginUser('1234@gmail.com', 'P@ssw0rd');
    
    cy.get('.hobbies-add-button').click(); 
  });

  it('should render HobbiesModal', () => {
    cy.get('.hobbies-form').should('be.visible');
  });

  it('should allow adding a hobby', () => {
    
    cy.get('.hobbies-item-wrapper > :nth-child(4)').click()
    cy.get('.modal-send-btn').click();
    cy.get('.hobbies-contener-wrapper-item > :nth-child(2)').should('contain', 'Rozrywka i rekreac');
    
  });

  it('should close the modal on clicking close button', () => {
    cy.get('.close-modal').click();
    cy.get('.hobbies-form').should('not.exist');
  });
});
describe('ProfileDescription Component Tests', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login')
    cy.loginUser('1234@gmail.com', 'P@ssw0rd');
    
  });

  it('should display user description and avatar', () => {
    cy.get('.desc-cont > div').should('be.visible');
    cy.get('h3').should('be.visible');
    cy.get('img').should('be.visible');
  });

  it('should open EditProfileModal on edit button click', () => {
    cy.get('.edit-profile-button').click();
    cy.get('.profile-modal-form').should('be.visible');
  });

  it('should update description and avatar after editing', () => {
    
    cy.get('.edit-profile-button').click();
    cy.get('#description').type('Updated Description');
    cy.get('#profilePhoto',{ timeout: 10000 }).type('https://upload.wikimedia.org/wikipedia/commons/0/05/FB-111_Bugs_Bunny_Nose_Art.jpeg');
    cy.get('.profile-save-btn').click();

    cy.get('.desc-cont > div').should('contain', 'Updated Description');
    cy.get('img').should('have.attr', 'src', 'https://upload.wikimedia.org/wikipedia/commons/0/05/FB-111_Bugs_Bunny_Nose_Art.jpeg');
  });
});
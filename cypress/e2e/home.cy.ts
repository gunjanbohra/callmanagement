describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the welcome message', () => {
    cy.contains('Welcome to Modern React Starter');
  });

  it('counter functionality works', () => {
    cy.contains('Current count: 0');
    cy.contains('button', 'Increase').click();
    cy.contains('Current count: 1');
    cy.contains('button', 'Decrease').click();
    cy.contains('Current count: 0');
  });
});
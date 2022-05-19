describe('categories', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories.json',
    });

    cy.visit('/categories');
  });

  it('shows a message when an error occurs moving an item down', () => {
    cy.intercept('PATCH', 'http://localhost:3000/categories/*?', {
      statusCode: 500,
    });
    cy.getTestId('move-down-button').first().click();
    cy.contains('An error occurred');
  });

  it('shows a message when an error occurs moving an item up', () => {
    cy.intercept('PATCH', 'http://localhost:3000/categories/*?', {
      statusCode: 500,
    });
    cy.getTestId('move-up-button').first().click();
    cy.contains('An error occurred');
  });
});

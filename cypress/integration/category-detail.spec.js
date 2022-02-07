describe('category detail', () => {
  const categoryId = 'cat1';

  beforeEach(() => {
    cy.signIn();

    cy.intercept('GET', `http://localhost:3000/categories/${categoryId}?`, {
      fixture: 'category.json',
    });

    cy.visit(`/categories/${categoryId}`);
  });

  it('displays the category name', () => {
    cy.contains('Category C');
  });

  it('shows a message upon error saving edits to the category', () => {
    cy.intercept('PATCH', `http://localhost:3000/categories/${categoryId}?`, {
      statusCode: 500,
    });
    cy.getTestId('save-button').click();
    cy.contains('An error occurred saving the category').should('be.visible');
  });
});

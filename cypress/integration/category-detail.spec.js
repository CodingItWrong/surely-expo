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

  it('allows going back to the category list', () => {
    cy.getTestId('back-button').click();
    cy.url().should('match', /\/categories$/);
  });

  it('shows a message upon error deleting the category', () => {
    cy.intercept('DELETE', `http://localhost:3000/categories/${categoryId}`, {
      statusCode: 500,
    });
    cy.getTestId('delete-button').click();
    cy.contains('An error occurred deleting the category').should('be.visible');
  });

  it('shows a message upon error saving edits to the category', () => {
    cy.intercept('PATCH', `http://localhost:3000/categories/${categoryId}?`, {
      statusCode: 500,
    });
    cy.getTestId('save-button').click();
    cy.contains('An error occurred saving the category').should('be.visible');
  });
});

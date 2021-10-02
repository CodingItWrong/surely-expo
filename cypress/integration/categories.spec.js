describe('categories', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories.json',
    });

    cy.visit('/categories');
  });

  it('lists existing categories', () => {
    cy.getTestId('category-list').contains('Category A');
    cy.getTestId('category-list').contains('Category B');
    cy.getTestId('category-list').contains('Category C');
  });

  it('shows a message when no categories listed', () => {
    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories-none.json',
    });

    cy.visit('/categories');

    cy.contains('No categories yet');
  });

  it('allows navigating to create a category', () => {
    // wait for existing todos to load
    cy.getTestId('category-list').contains('Category A');

    cy.getTestId('add-button').click();
    cy.url().should('include', '/categories/new');
  });

  it('allows navigating to a category detail', () => {
    cy.getTestId('category-list').contains('Category A').click();
    cy.url().should('include', '/categories/cat3');
  });
});

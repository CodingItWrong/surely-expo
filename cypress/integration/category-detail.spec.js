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
});

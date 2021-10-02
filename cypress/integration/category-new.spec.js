describe('category new', () => {
  const name = 'New Category';

  beforeEach(() => {
    cy.signIn();
    cy.visit('/categories/new');
  });

  it('allows creating the category', () => {
    cy.intercept('POST', 'http://localhost:3000/categories?', {
      fixture: 'todo/available.json',
    }).as('create');

    cy.getTestId('name-field').type(name);
    cy.getTestId('save-button').click();

    cy.wait('@create').then(({request}) => {
      assert.equal(request.body.data.attributes.name, name);
    });

    cy.url().should('match', /\/categories$/);
  });

  it('allows cancelling creation', () => {
    cy.getTestId('cancel-button').click();
    cy.url().should('match', /\/categories$/);
  });
});

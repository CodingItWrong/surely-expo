describe('todo detail - tomorrow', () => {
  const todoId = 'abc123';

  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      `http://localhost:3000/todos/${todoId}?include=category`,
      {fixture: 'todo/available.json'},
    );

    cy.visit(`/todos/tomorrow/${todoId}`);
  });

  it('allows going back to tomorrow todos', () => {
    cy.getTestId('back-button').click();
    cy.url().should('match', /\/todos\/tomorrow/);
  });

  it('allows editing the todo', () => {
    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories.json',
    });
    cy.intercept(
      'PATCH',
      `http://localhost:3000/todos/${todoId}?include=category`,
      {
        fixture: 'todo/available.json',
      },
    ).as('update');

    const name = 'Updated Name';

    cy.getTestId('edit-button').click();
    cy.getTestId('name-field').clear().type(name);
    cy.getTestId('save-button').click();

    cy.wait('@update').then(({request}) => {
      assert.equal(request.body.data.attributes.name, name);
    });

    cy.getTestId('edit-button').should('exist');
  });
});

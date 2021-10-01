describe('todo detail - completed', () => {
  const todoId = 'abc123';

  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      `http://localhost:3000/todos/${todoId}?include=category`,
      {fixture: 'todo/completed.json'},
    );

    cy.visit(`/todos/completed/${todoId}`);
  });

  it('displays the todo completion date', () => {
    cy.contains('Completed 08/28/2021');
  });

  it('allows going back to available todos', () => {
    cy.getTestId('back-button').click();
    cy.url().should('match', /\/todos\/completed/);
  });

  it('allows uncompleting the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      fixture: 'todo/available.json',
    }).as('update');
    cy.intercept('GET', 'http://localhost:3000/todos?*', {});

    cy.getTestId('uncomplete-button').click();

    cy.wait('@update').then(({request}) => {
      assert.isNull(request.body.data.attributes['completed-at']);
    });

    cy.url().should('include', '/todos/completed');
  });

  it('allows deleting the todo', () => {
    // PATCH because it is a soft delete
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      fixture: 'todo/available.json',
    }).as('delete');
    cy.intercept('GET', 'http://localhost:3000/todos?*', {});

    cy.getTestId('delete-button').click();

    cy.wait('@delete').then(({request}) => {
      assert.isNotNull(request.body.data.attributes['deleted-at']);
    });

    cy.url().should('include', '/todos/completed');
  });
});

describe('todo detail - available', () => {
  const todoId = 'abc123';

  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      `http://localhost:3000/todos/${todoId}?include=category`,
      {fixture: 'todo/available.json'},
    );

    cy.visit(`/todos/available/${todoId}`);
  });

  it('displays the todo content', () => {
    cy.contains('My Available Todo');
    cy.contains('Notes for the todo');
    cy.contains('Created 08/27/2021');
  });

  it('allows completing the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      fixture: 'todo/available.json',
    }).as('update');
    cy.intercept('GET', 'http://localhost:3000/todos?*', {});

    cy.getTestId('complete-button').click();

    cy.wait('@update').then(({request}) => {
      assert.isNotNull(request.body.data.attributes['completed-at']);
    });

    cy.url().should('include', '/todos/available');
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

    cy.url().should('include', '/todos/available');
  });
});

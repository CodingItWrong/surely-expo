describe('todo detail - completed', () => {
  const todoId = 'abc123';

  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      `http://localhost:3000/todos/${todoId}?include=category`,
      {fixture: 'todo/deleted.json'},
    );

    cy.visit(`/todos/deleted/${todoId}`);
  });

  it('displays the todo dates', () => {
    cy.contains('Completed 08/28/2021');
    cy.contains('Deleted 08/29/2021');
  });

  it('allows going back to available todos', () => {
    cy.getTestId('back-button').click();
    cy.url().should('match', /\/todos\/deleted/);
  });

  it('allows undeleting the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      fixture: 'todo/available.json',
    }).as('update');
    cy.intercept('GET', 'http://localhost:3000/todos?*', {});

    cy.getTestId('undelete-button').click();

    cy.wait('@update').then(({request}) => {
      assert.isNull(request.body.data.attributes['deleted-at']);
      assert.isNull(request.body.data.attributes['completed-at']);
    });

    cy.url().should('include', '/todos/deleted');
  });
});

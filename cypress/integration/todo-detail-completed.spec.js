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

  it('shows a message when there is an error uncompleting the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      statusCode: 500,
    });
    cy.getTestId('uncomplete-button').click();
    cy.contains('An error occurred');
  });
});

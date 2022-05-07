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

  it('shows a message when there is an error undeleting the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      statusCode: 500,
    });
    cy.getTestId('undelete-button').click();
    cy.contains('An error occurred');
  });
});

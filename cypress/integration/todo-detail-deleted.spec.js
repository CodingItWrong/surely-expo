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

  it('shows a message when there is an error undeleting the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      statusCode: 500,
    });
    cy.getTestId('undelete-button').click();
    cy.contains('An error occurred');
  });
});

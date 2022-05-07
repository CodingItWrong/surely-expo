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
});

describe('completed todos', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=1',
      {fixture: 'todos/completed.json'},
    );

    cy.visit('/todos/completed');
  });

  it('lists existing completed todos', () => {
    cy.getTestId('completed-todos').contains('Todo 1');
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('completed-todos').contains('Todo 1').click();
    cy.url().should('include', '/todos/completed/abc123');
  });
});

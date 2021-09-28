describe('tomorrow todos', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=tomorrow&include=category',
      {fixture: 'todos/future.json'},
    );

    cy.visit('/todos/tomorrow');
  });

  it('lists existing tomorrow todos', () => {
    cy.getTestId('tomorrow-todos').contains('Todo 1');
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('tomorrow-todos').contains('Todo 1').click();
    cy.url().should('include', '/todos/tomorrow/abc123');
  });
});

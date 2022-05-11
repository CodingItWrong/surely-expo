describe('deleted todos', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=1',
      {fixture: 'todos/deleted.json'},
    );

    cy.visit('/todos/deleted');
  });

  it('allows page navigation', () => {
    // wait for page to load
    cy.getTestId('todo-list').contains('Todo 1');

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=2',
      {fixture: 'todos/deleted-page2.json'},
    );

    cy.getTestId('next-page-button').click();
    cy.getTestId('todo-list').contains('Todo 4');

    cy.getTestId('previous-page-button').click();
    cy.getTestId('todo-list').contains('Todo 1');
  });
});

describe('completed todos', () => {
  const searchText = 'MySearchText';

  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=1',
      {fixture: 'todos/completed.json'},
    );

    cy.visit('/todos/completed');
  });

  it('resets pagination upon search', () => {
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=completed&filter[search]=${searchText}&sort=-completedAt&page[number]=1`,
      {fixture: 'todos/completed.json'},
    ).as('search');

    // wait for page to load
    cy.getTestId('todo-list').contains('Todo 1');

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=2',
      {fixture: 'todos/completed-page2.json'},
    );

    cy.getTestId('next-page-button').click();
    cy.getTestId('todo-list').contains('Todo 4');

    cy.getTestId('search-field').type(`${searchText}{enter}`);
    cy.getTestId('todo-list').contains('Todo 1');
  });
});

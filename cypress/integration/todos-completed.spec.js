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

  it('allows page navigation', () => {
    // wait for page to load
    cy.getTestId('todo-list').contains('Todo 1');

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=2',
      {fixture: 'todos/completed-page2.json'},
    );

    cy.getTestId('next-page-button').click();
    cy.getTestId('todo-list').contains('Todo 4');

    cy.getTestId('previous-page-button').click();
    cy.getTestId('todo-list').contains('Todo 1');
  });

  it('allows searching for todos', () => {
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=completed&filter[search]=${searchText}&sort=-completedAt&page[number]=1`,
      {fixture: 'todos/completed.json'},
    ).as('search');

    cy.getTestId('search-field').type(`${searchText}{enter}`);

    cy.wait('@search');
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

  it('shows a message when no search results returned', () => {
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=completed&filter[search]=${searchText}&sort=-completedAt&page[number]=1`,
      {fixture: 'todos/none.json'},
    );

    cy.getTestId('search-field').type(`${searchText}{enter}`);

    cy.contains('No completed todos matched your search');
  });
});

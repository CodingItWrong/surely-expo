describe('deleted todos', () => {
  const searchText = 'MySearchText';

  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=1',
      {fixture: 'todos/deleted.json'},
    );

    cy.visit('/todos/deleted');
  });

  it('allows searching for todos', () => {
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=deleted&filter[search]=${searchText}&sort=-deletedAt&page[number]=1`,
      {fixture: 'todos/deleted.json'},
    ).as('search');

    cy.getTestId('search-field').type(`${searchText}{enter}`);

    cy.wait('@search');
  });

  it('shows a message when no search results returned', () => {
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=deleted&filter[search]=${searchText}&sort=-deletedAt&page[number]=1`,
      {fixture: 'todos/none.json'},
    );

    cy.getTestId('search-field').type(`${searchText}{enter}`);

    cy.contains('No deleted todos matched your search');
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

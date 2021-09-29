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

  it('lists existing deleted todos', () => {
    cy.getTestId('todo-list').contains('08/28/2021');
    cy.getTestId('todo-list').contains('Todo 1');
  });

  it('shows a message when no todos listed', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=1',
      {fixture: 'todos/none.json'},
    );

    cy.visit('/todos/deleted');

    cy.contains("You have no deleted todos. Don't be afraid to give up!");
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

  it('allows navigating to a todo detail', () => {
    cy.getTestId('todo-list').contains('Todo 1').click();
    cy.url().should('include', '/todos/deleted/abc123');
  });

  it('allows page navigation', () => {
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

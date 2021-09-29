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
    cy.getTestId('completed-todos').contains('08/28/2021');
    cy.getTestId('completed-todos').contains('Todo 1');
  });

  it('allows searching for todos', () => {
    const searchText = 'MySearchText';
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=completed&filter[search]=${searchText}&sort=-completedAt&page[number]=1`,
      {fixture: 'todos/completed.json'},
    ).as('search');

    cy.getTestId('search-field').type(`${searchText}{enter}`);

    cy.wait('@search');
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('completed-todos').contains('Todo 1').click();
    cy.url().should('include', '/todos/completed/abc123');
  });

  it('allows page navigation', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=2',
      {fixture: 'todos/completed-page2.json'},
    );

    cy.getTestId('next-page-button').click();
    cy.getTestId('completed-todos').contains('Todo 4');

    cy.getTestId('previous-page-button').click();
    cy.getTestId('completed-todos').contains('Todo 1');
  });
});

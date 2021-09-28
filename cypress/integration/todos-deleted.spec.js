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

  it('lists existing deleted todos', () => {
    cy.getTestId('deleted-todos').contains('Todo 1');
  });

  it('allows searching for todos', () => {
    const searchText = 'MySearchText';
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=deleted&filter[search]=${searchText}&sort=-deletedAt&page[number]=1`,
      {fixture: 'todos/deleted.json'},
    ).as('search');

    cy.getTestId('search-field').type(`${searchText}{enter}`);

    cy.wait('@search');
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('deleted-todos').contains('Todo 1').click();
    cy.url().should('include', '/todos/deleted/abc123');
  });
});

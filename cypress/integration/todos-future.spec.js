describe('future todos', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=future&filter[search]=&sort=name',
      {fixture: 'todos/future.json'},
    );

    cy.visit('/todos/future');
  });

  it('lists existing future todos', () => {
    cy.getTestId('future-todos').contains('08/28/2021');
    cy.getTestId('future-todos').contains('Todo 1');
  });

  it('allows searching for todos', () => {
    const searchText = 'MySearchText';
    cy.intercept(
      'GET',
      `http://localhost:3000/todos?filter[status]=future&filter[search]=${searchText}&sort=name`,
      {fixture: 'todos/future.json'},
    ).as('search');

    cy.getTestId('search-field').type(`${searchText}{enter}`);

    cy.wait('@search');
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('future-todos').contains('Todo 1').click();
    cy.url().should('include', '/todos/future/abc123');
  });
});

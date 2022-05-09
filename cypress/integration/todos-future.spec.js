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
});

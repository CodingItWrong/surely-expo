describe('available todos', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos/available.json'},
    );

    cy.visit('/');
  });

  it('shows an error when creating todo fails', () => {
    // wait for existing todos to load
    cy.getTestId('todo-list').contains('Todo 1');

    const todoName = 'My New Todo';

    cy.intercept('post', 'http://localhost:3000/todos?', {statusCode: 500});

    cy.getTestId('new-todo-name').type(`${todoName}{enter}`);

    cy.getTestId('error-message').should('be.visible');
  });
});

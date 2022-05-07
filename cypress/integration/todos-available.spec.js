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

  it('shows an error when loading todos fails', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {statusCode: 500},
    );

    cy.visit('/');
    cy.contains('An error occurred');
  });

  it('shows a message when no todos listed', () => {
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos/none.json'},
    );

    cy.visit('/');

    cy.contains('You have no available todos. Nice work!');
  });

  it('allows creating todos', () => {
    // wait for existing todos to load
    cy.getTestId('todo-list').contains('Todo 1');

    const todoName = 'My New Todo';

    cy.intercept('post', 'http://localhost:3000/todos?', {}).as('create');

    // update response to include new todo
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos/available-with-new.json'},
    );

    cy.getTestId('new-todo-name').type(`${todoName}{enter}`);

    cy.wait('@create').then(({request}) => {
      assert.equal(request.body.data.attributes.name, todoName);
    });

    cy.getTestId('todo-list').contains(todoName);
  });

  it('shows an error when creating todo fails', () => {
    // wait for existing todos to load
    cy.getTestId('todo-list').contains('Todo 1');

    const todoName = 'My New Todo';

    cy.intercept('post', 'http://localhost:3000/todos?', {statusCode: 500});

    cy.getTestId('new-todo-name').type(`${todoName}{enter}`);

    cy.getTestId('error-message').should('be.visible');
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('todo-list').contains('Todo 1').click();
    cy.url().should('include', '/todos/available/abc123');
  });
});

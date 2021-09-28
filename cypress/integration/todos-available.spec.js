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

  it('lists existing available todos', () => {
    cy.getTestId('available-todos').contains('Todo 1');
  });

  it('allows creating todos', () => {
    // wait for existing todos to load
    cy.getTestId('available-todos').contains('Todo 1');

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

    cy.getTestId('available-todos').contains(todoName);
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('available-todos').contains('Todo 1').click();
    cy.url().should('include', '/todos/available/abc123');
  });
});

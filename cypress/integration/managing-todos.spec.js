describe('managing todos', () => {
  it('allows creating todos', () => {
    const todoName = 'My New Todo';

    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos.json'},
    );
    cy.intercept('post', 'http://localhost:3000/todos?', {}).as('create');

    cy.visit('/');
    cy.getTestId('available-todos').contains('Todo 1');

    // update response to include new todo
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos-with-new.json'},
    );

    cy.getTestId('new-todo-name').type(`${todoName}{enter}`);

    cy.wait('@create').then(({request}) => {
      assert.equal(request.body.data.attributes.name, todoName);
    });

    cy.getTestId('available-todos').contains(todoName);
  });
});

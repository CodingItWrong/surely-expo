describe('tomorrow todos', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=tomorrow&include=category',
      {fixture: 'todos/future.json'},
    );

    cy.visit('/todos/tomorrow');
  });

  it('lists existing tomorrow todos', () => {
    cy.getTestId('tomorrow-todos').contains('My Category');
    cy.getTestId('tomorrow-todos').contains('Todo 1');
  });

  it('allows creating a tomorrow todo', () => {
    // wait for existing todos to load
    cy.getTestId('tomorrow-todos').contains('Todo 1');

    const todoName = 'My New Todo';

    cy.intercept('post', 'http://localhost:3000/todos?', {}).as('create');

    // update response to include new todo
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=tomorrow&include=category',
      {fixture: 'todos/available-with-new.json'},
    );

    cy.getTestId('new-todo-name').type(`${todoName}{enter}`);

    cy.wait('@create').then(({request}) => {
      const {attributes} = request.body.data;
      assert.equal(attributes.name, todoName);
      assert.isNotNull(attributes['deferred-until']);
    });

    cy.getTestId('tomorrow-todos').contains(todoName);
  });

  it('allows navigating to a todo detail', () => {
    cy.getTestId('tomorrow-todos').contains('Todo 1').click();
    cy.url().should('include', '/todos/tomorrow/abc123');
  });
});

describe('todo detail - available', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/oauth/token', {
      fixture: 'session.json',
    });

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos/available.json'},
    );

    cy.intercept('POST', 'http://localhost:3000/todos?').as('createTodo');

    cy.intercept('GET', 'http://localhost:3000/todos/abc123?include=category', {
      fixture: 'todo/available.json',
    });

    cy.intercept('PATCH', 'http://localhost:3000/todos/abc123?').as(
      'completeTodo',
    );
  });

  it('allows listing, adding, and completing todos', () => {
    cy.visit('/');
    cy.getTestId('email-field').type('example@example.com');
    cy.getTestId('password-field').type('password');
    cy.getTestId('sign-in-button').click();

    // create todo
    cy.getTestId('new-todo-name').type('My New Todo{enter}');
    cy.wait('@createTodo');

    // complete todo
    cy.getTestId('todo-list').contains('Todo 1').click();
    cy.getTestId('complete-button').click();
    cy.wait('@completeTodo');
  });
});

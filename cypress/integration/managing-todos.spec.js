describe('managing todos', () => {
  it('allows creating and completing todos', () => {
    cy.intercept('POST', 'http://localhost:3000/oauth/token', {
      fixture: 'session.json',
    }).as('login');
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos.json'},
    );
    cy.intercept('post', 'http://localhost:3000/todos?', {}).as('create');

    const email = 'example@example.com';
    const password = 'password';
    const todoName = 'My New Todo';

    cy.visit('/');
    cy.getTestId('email').type(email);
    cy.getTestId('password').type(password);
    cy.getTestId('sign-in').click();

    cy.wait('@login').then(({request}) => {
      console.log(request.body);
      assert.equal(request.body.username, email);
      assert.equal(request.body.password, password);
    });

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

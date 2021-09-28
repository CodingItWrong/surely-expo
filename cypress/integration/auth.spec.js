describe('auth', () => {
  it('allows logging in', () => {
    cy.intercept('POST', 'http://localhost:3000/oauth/token', {
      fixture: 'session.json',
    }).as('login');
    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos/available.json'},
    );

    const email = 'example@example.com';
    const password = 'password';

    cy.visit('/');
    cy.getTestId('email').type(email);
    cy.getTestId('password').type(password);
    cy.getTestId('sign-in').click();

    cy.wait('@login').then(({request}) => {
      console.log(request.body);
      assert.equal(request.body.username, email);
      assert.equal(request.body.password, password);
    });

    cy.getTestId('available-todos').contains('Todo 1');
  });
});

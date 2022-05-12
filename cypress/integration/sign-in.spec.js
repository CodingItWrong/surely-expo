describe('sign-in', () => {
  it('allows signing out', () => {
    cy.signIn();

    cy.intercept(
      'GET',
      'http://localhost:3000/todos?filter[status]=available&include=category',
      {fixture: 'todos/available.json'},
    );

    cy.visit('/');

    cy.getTestId('sign-out-button').click();

    cy.getTestId('email-field').should('exist');
  });
});

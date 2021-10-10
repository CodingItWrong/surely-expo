describe('sign-up', () => {
  const email = 'example@example.com';
  const password = 'password';

  beforeEach(() => {
    cy.visit('/signup');
  });

  it('allows cancelling sign up', () => {
    cy.getTestId('cancel-button').click();
    cy.getTestId('sign-up-button').should('exist');
  });

  it('allows signing up', () => {
    cy.intercept('POST', 'http://localhost:3000/users?', {}).as('signup');

    cy.getTestId('email-field').type(email);
    cy.getTestId('password-field').type(password);
    cy.getTestId('password-confirmation-field').type(password);
    cy.getTestId('submit-sign-up-button').click();

    cy.wait('@signup').then(({request}) => {
      const {attributes} = request.body.data;
      assert.equal(attributes.email, email);
      assert.equal(attributes.password, password);
    });

    cy.contains('Sign up successful');
    cy.getTestId('go-to-sign-in-button').click();
    cy.url().should('match', /\/signin$/);
  });

  it('validates sign up form data', () => {
    cy.getTestId('submit-sign-up-button').click();
    cy.contains('Email is required.').should('exist');

    cy.getTestId('email-field').type(email);
    cy.getTestId('submit-sign-up-button').click();
    cy.contains('Password is required.').should('exist');

    cy.getTestId('password-field').type(password);
    cy.getTestId('submit-sign-up-button').click();
    cy.contains('Password confirmation is required.').should('exist');

    cy.getTestId('password-confirmation-field').type('incorrect');
    cy.getTestId('submit-sign-up-button').click();
    cy.contains('Passwords do not match.').should('exist');
  });
});

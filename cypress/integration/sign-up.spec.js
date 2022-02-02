describe('sign-up', () => {
  const email = 'example@example.com';
  const password = 'password';

  beforeEach(() => {
    cy.visit('/signup');
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

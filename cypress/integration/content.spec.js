describe('content', () => {
  it('provides a privacy policy page', () => {
    cy.visit('/about/privacy');
    cy.contains("Surely doesn't use any analytics");
  });

  it('provides a support page', () => {
    cy.visit('/about/support');

    cy.getTestId('chat-button').should('be.visible');
    cy.getTestId('issues-button').should('be.visible');
    cy.getTestId('email-button').should('be.visible');

    // hard to test URLs because is not in an href attribute and opens in new tab
  });
});

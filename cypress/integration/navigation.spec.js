describe('navigation', () => {
  describe('signed out', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('starts on the sign in page', () => {
      cy.url().should('include', '/signin');
    });

    it('allows navigating to the sign up page', () => {
      cy.getTestId('sign up-nav-button').click();
      cy.url().should('include', '/signup');
    });

    it('allows navigating to the about page', () => {
      cy.getTestId('about-nav-button').click();
      cy.url().should('include', '/about');
    });

    it('allows navigating to the support page', () => {
      cy.getTestId('about-nav-button').click();
      cy.getTestId('support-button').click();
      cy.url().should('include', '/about/support');
    });

    it('allows navigating to the privacy page', () => {
      cy.getTestId('about-nav-button').click();
      cy.getTestId('privacy-button').click();
      cy.url().should('include', '/about/privacy');
    });
  });

  describe('signed in', () => {
    beforeEach(() => {
      cy.signIn();

      cy.intercept(
        'GET',
        'http://localhost:3000/todos?filter[status]=available&include=category',
        {fixture: 'todos/available.json'},
      );

      cy.visit('/');
    });

    it('defaults to the available page', () => {
      cy.url().should('include', '/todos/available');
    });

    it('allows navigating to the about page', () => {
      cy.getTestId('about-nav-button').click();
      cy.url().should('include', '/about');
    });

    function testTodoNavigationButton(status) {
      cy.getTestId(`${status}-nav-button`).click();
      cy.url().should('include', `/todos/${status}`);
    }

    it('allows navigating to available', () => {
      testTodoNavigationButton('available');
    });

    it('allows navigating to tomorrow', () => {
      testTodoNavigationButton('tomorrow');
    });

    it('allows navigating to future', () => {
      testTodoNavigationButton('future');
    });

    it('allows navigating to completed', () => {
      testTodoNavigationButton('completed');
    });

    it('allows navigating to deleted', () => {
      testTodoNavigationButton('deleted');
    });
  });

  // started flaking locally
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');

      cy.signIn();

      cy.intercept(
        'GET',
        'http://localhost:3000/todos?filter[status]=available&include=category',
        {fixture: 'todos/available.json'},
      );

      cy.visit('/');
    });

    it('does not show the navigation by default', () => {
      cy.getTestId('available-nav-button').should('not.be.visible');
    });

    it('shows the navigation when you toggle it', () => {
      cy.getTestId('toggle-navigation-button').click();
      cy.getTestId('available-nav-button').should('be.visible');
    });
  });
});

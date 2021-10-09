describe('navigation', () => {
  describe('desktop', () => {
    beforeEach(() => {
      cy.signIn();

      cy.intercept(
        'GET',
        'http://localhost:3000/todos?filter[status]=available&include=category',
        {fixture: 'todos/available.json'},
      );

      cy.visit('/');
    });

    function testNavigationButton(status) {
      cy.getTestId(`${status}-nav-button`).click();
      cy.url().should('include', `/todos/${status}`);
    }

    it('allows navigating to available', () => {
      testNavigationButton('available');
    });

    it('allows navigating to tomorrow', () => {
      testNavigationButton('tomorrow');
    });

    it('allows navigating to future', () => {
      testNavigationButton('future');
    });

    it('allows navigating to completed', () => {
      testNavigationButton('completed');
    });

    it('allows navigating to deleted', () => {
      testNavigationButton('deleted');
    });
  });

  describe('mobile', () => {
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

    function testNavigationButton(status) {
      cy.getTestId('toggle-navigation-button').click();
      cy.getTestId(`${status}-nav-button`).click();
      cy.url().should('include', `/todos/${status}`);
    }

    it('allows navigating to available', () => {
      testNavigationButton('available');
    });

    it('allows navigating to tomorrow', () => {
      testNavigationButton('tomorrow');
    });

    it('allows navigating to future', () => {
      testNavigationButton('future');
    });

    it('allows navigating to completed', () => {
      testNavigationButton('completed');
    });

    it('allows navigating to deleted', () => {
      testNavigationButton('deleted');
    });
  });
});

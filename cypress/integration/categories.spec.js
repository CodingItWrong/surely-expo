describe('categories', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories.json',
    });

    cy.visit('/categories');
  });

  it('allows moving an item down in the sort order', () => {
    cy.intercept('PATCH', 'http://localhost:3000/categories/cat1?', {
      fixture: 'category.json',
    }).as('updateCat1');
    cy.intercept('PATCH', 'http://localhost:3000/categories/cat2?', {
      fixture: 'category.json',
    }).as('updateCat2');
    cy.intercept('PATCH', 'http://localhost:3000/categories/cat3?', {
      fixture: 'category.json',
    }).as('updateCat3');

    cy.getTestId('move-down-button').first().click();

    cy.wait('@updateCat2').then(({request}) => {
      assert.equal(request.body.data.attributes['sort-order'], 0);
    });
    cy.wait('@updateCat3').then(({request}) => {
      assert.equal(request.body.data.attributes['sort-order'], 1);
    });
    cy.wait('@updateCat1').then(({request}) => {
      assert.equal(request.body.data.attributes['sort-order'], 2);
    });
  });

  it('shows a message when an error occurs moving an item down', () => {
    cy.intercept('PATCH', 'http://localhost:3000/categories/*?', {
      statusCode: 500,
    });
    cy.getTestId('move-down-button').first().click();
    cy.contains('An error occurred');
  });

  it('allows moving an item up in the sort order', () => {
    cy.intercept('PATCH', 'http://localhost:3000/categories/cat1?', {
      fixture: 'category.json',
    }).as('updateCat1');
    cy.intercept('PATCH', 'http://localhost:3000/categories/cat2?', {
      fixture: 'category.json',
    }).as('updateCat2');
    cy.intercept('PATCH', 'http://localhost:3000/categories/cat3?', {
      fixture: 'category.json',
    }).as('updateCat3');

    cy.getTestId('move-up-button').last().click();

    cy.wait('@updateCat3').then(({request}) => {
      assert.equal(request.body.data.attributes['sort-order'], 0);
    });
    cy.wait('@updateCat1').then(({request}) => {
      assert.equal(request.body.data.attributes['sort-order'], 1);
    });
    cy.wait('@updateCat2').then(({request}) => {
      assert.equal(request.body.data.attributes['sort-order'], 2);
    });
  });

  it('shows a message when an error occurs moving an item up', () => {
    cy.intercept('PATCH', 'http://localhost:3000/categories/*?', {
      statusCode: 500,
    });
    cy.getTestId('move-up-button').first().click();
    cy.contains('An error occurred');
  });
});

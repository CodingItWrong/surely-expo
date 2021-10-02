describe('categories', () => {
  beforeEach(() => {
    cy.signIn();

    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories.json',
    });

    cy.visit('/categories');
  });

  it('lists existing categories', () => {
    cy.getTestId('category-list').contains('Category A');
    cy.getTestId('category-list').contains('Category B');
    cy.getTestId('category-list').contains('Category C');
  });

  it('shows a message when no categories listed', () => {
    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories-none.json',
    });

    cy.visit('/categories');

    cy.contains('No categories yet');
  });

  it('allows navigating to create a category', () => {
    // wait for existing todos to load
    cy.getTestId('category-list').contains('Category A');

    cy.getTestId('add-button').click();
    cy.url().should('include', '/categories/new');
  });

  it('allows navigating to a category detail', () => {
    cy.getTestId('category-list').contains('Category A').click();
    cy.url().should('include', '/categories/cat3');
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
});

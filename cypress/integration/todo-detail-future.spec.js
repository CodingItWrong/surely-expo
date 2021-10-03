describe('todo detail - future', () => {
  const todoId = 'abc123';

  beforeEach(() => {
    cy.signIn();

    cy.intercept(
      'GET',
      `http://localhost:3000/todos/${todoId}?include=category`,
      {fixture: 'todo/future.json'},
    );

    cy.visit(`/todos/future/${todoId}`);
  });

  it('displays the deferred date', () => {
    cy.contains('Deferred until 08/27/2121');
  });

  it('allows going back to future todos', () => {
    cy.getTestId('back-button').click();
    cy.url().should('match', /\/todos\/future/);
  });

  it('allows completing the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      fixture: 'todo/future.json',
    }).as('update');
    cy.intercept('GET', 'http://localhost:3000/todos?*', {});

    cy.getTestId('complete-button').click();

    cy.wait('@update').then(({request}) => {
      assert.isNotNull(request.body.data.attributes['completed-at']);
    });

    cy.url().should('include', '/todos/future');
  });

  it('allows deleting the todo', () => {
    // PATCH because it is a soft delete
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      fixture: 'todo/future.json',
    }).as('delete');
    cy.intercept('GET', 'http://localhost:3000/todos?*', {});

    cy.getTestId('delete-button').click();

    cy.wait('@delete').then(({request}) => {
      assert.isNotNull(request.body.data.attributes['deleted-at']);
    });

    cy.url().should('include', '/todos/future');
  });

  it('allows editing the todo', () => {
    cy.intercept('GET', 'http://localhost:3000/categories?', {
      fixture: 'categories.json',
    });
    cy.intercept(
      'PATCH',
      `http://localhost:3000/todos/${todoId}?include=category`,
      {
        fixture: 'todo/future.json',
      },
    ).as('update');

    const name = 'Updated Name';

    cy.getTestId('edit-button').click();
    cy.getTestId('name-field').clear().type(name);
    cy.getTestId('save-button').click();

    cy.wait('@update').then(({request}) => {
      assert.equal(request.body.data.attributes.name, name);
    });

    cy.getTestId('edit-button').should('exist');
  });

  it('allows deferring the todo', () => {
    cy.intercept('PATCH', `http://localhost:3000/todos/${todoId}?`, {
      fixture: 'todo/future.json',
    }).as('update');

    cy.getTestId('defer-button').click();
    cy.getTestId('defer-1-day-button').click();

    cy.wait('@update').then(({request}) => {
      assert.isNotNull(request.body.data.attributes['deferred-until']);
    });

    cy.url().should('include', '/todos/future');
  });
});
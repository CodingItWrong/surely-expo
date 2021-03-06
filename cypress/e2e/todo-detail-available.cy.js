describe('todo detail - available', () => {
  const todoId = 'abc123';

  describe('when the todo loads successfully', () => {
    beforeEach(() => {
      cy.signIn();

      cy.intercept(
        'GET',
        `http://localhost:3000/todos/${todoId}?include=category`,
        {fixture: 'todo/available.json'},
      );

      cy.visit(`/todos/available/${todoId}`);
    });

    // TODO: find out why category dropdown doesn't work in RNTL
    it('allows editing the todo', () => {
      cy.intercept('GET', 'http://localhost:3000/categories?', {
        fixture: 'categories.json',
      });
      cy.intercept(
        'PATCH',
        `http://localhost:3000/todos/${todoId}?include=category`,
        {
          fixture: 'todo/available.json',
        },
      ).as('update');

      const name = 'Updated Name';
      const notes = 'Updated Notes';

      cy.getTestId('edit-button').click();

      cy.getTestId('name-field').clear().type(name);
      cy.getTestId('notes-field').clear().type(notes);
      cy.getTestId('cancel-button').click();
      // cy.should('not.contain', name);
      // cy.should('not.contain', notes);

      cy.getTestId('edit-button').click();

      cy.getTestId('name-field').clear().type(name);
      cy.getTestId('notes-field').clear().type(notes);
      cy.getTestId('choose-category-field').click();
      cy.contains('Category B').click({force: true});
      cy.getTestId('save-button').click();

      cy.wait('@update').then(({request}) => {
        const {attributes, relationships} = request.body.data;
        assert.equal(attributes.name, name);
        assert.equal(attributes.notes, notes);
        assert.equal(relationships.category.data.id, 'cat2');
      });

      cy.getTestId('edit-button').should('exist');
    });

    it('shows a message when there is an error saving edits to the todo', () => {
      cy.intercept('GET', 'http://localhost:3000/categories?', {
        fixture: 'categories.json',
      });
      cy.intercept(
        'PATCH',
        `http://localhost:3000/todos/${todoId}?include=category`,
        {statusCode: 500},
      );
      cy.getTestId('edit-button').click();
      cy.getTestId('save-button').click();
      cy.contains('An error occurred');
    });
  });
});

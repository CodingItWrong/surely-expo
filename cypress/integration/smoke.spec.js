describe('smoke test', () => {
  it('displays todos', () => {
    cy.intercept('GET', 'http://localhost:3000/todos', {fixture: 'todos.json'});

    cy.visit('/');
    cy.contains('Todo 1');
  });
});

import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

export function groupByCategory(input) {
  const todos = input.data;
  const categories = input.included;

  function categoryForTodo(todo) {
    const categoryId = todo.relationships.category?.data?.id;
    return categories?.find(c => c.id === categoryId);
  }

  const groupsObject = groupBy(todos, todo => {
    const category = categoryForTodo(todo);
    return category?.attributes?.name;
  });
  const groups = Object.entries(groupsObject).map(([, groupTodos]) => ({
    name: categoryForTodo(groupTodos[0])?.attributes?.name ?? 'No Category',
    todos: sortBy(groupTodos, t => t.attributes.name.toLowerCase()),
  }));
  const sortedGroups = sortBy(
    groups,
    group =>
      categoryForTodo(group.todos[0])?.attributes?.['sort-order'] ?? -9999,
  );
  return sortedGroups;
}

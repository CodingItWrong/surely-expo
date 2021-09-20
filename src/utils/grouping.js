import startOfDay from 'date-fns/startOfDay';
import groupBy from 'lodash/groupBy';
import reverseFn from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import {capitalize} from './strings';
import {relativeDate} from './time';

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

export function groupByDate({
  todos,
  attribute,
  reverse = false,
  now = new Date(),
}) {
  const groupsObject = groupBy(todos, todo =>
    startOfDay(new Date(todo.attributes[attribute])).toISOString(),
  );
  const sortedGroupEntries = sortBy(
    Object.entries(groupsObject),
    ([key]) => key,
  );
  const groupEntriesToUse = reverse
    ? reverseFn(sortedGroupEntries)
    : sortedGroupEntries;
  return groupEntriesToUse.map(([date, groupTodos]) => ({
    name: capitalize(relativeDate(date, {now})),
    todos: sortBy(groupTodos, 'attributes.name'),
  }));
}

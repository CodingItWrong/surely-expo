import {useLinkTo} from '@react-navigation/native';
import {useCallback} from 'react';
import {useTodos} from '../../data/todos';
import {groupByDate} from '../../utils/grouping';
import TodoListScreen from './TodoListScreen';

export default function CompletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();

  const loadCompletedTodos = useCallback(
    ({searchText, pageNumber}) =>
      todoClient
        .where({
          filter: {status: 'completed', search: searchText},
          options: {sort: '-completedAt', 'page[number]': pageNumber},
        })
        .then(todoResponse => {
          console.log(todoResponse);
          return {
            todoGroups: groupByDate({
              todos: todoResponse.data,
              attribute: 'completed-at',
              reverse: true,
            }),
            maxPageNumber: todoResponse?.meta?.['page-count'],
          };
        }),
    [todoClient],
  );

  const goToCompletedTodo = todo => linkTo(`/todos/completed/${todo.id}`);

  return (
    <TodoListScreen
      search
      paginate
      onLoadTodos={loadCompletedTodos}
      onPressTodo={goToCompletedTodo}
      noTodosMessage="You have no completed todos. You'll get there!"
      noSearchResultsMessage="No completed todos matched your search"
    />
  );
}

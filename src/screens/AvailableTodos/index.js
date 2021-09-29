import {useLinkTo} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useTodos} from '../../data/todos';
import {groupByCategory} from '../../utils/grouping';
import TodoListScreen from '../TodoListScreen';

export default function AvailableTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const loadAvailableTodos = useCallback(
    () =>
      todoClient
        .where({
          filter: {status: 'available'},
          options: {include: 'category'},
        })
        .then(todoResponse => ({todoGroups: groupByCategory(todoResponse)})),
    [todoClient],
  );

  const createAvailableTodo = name => todoClient.create({attributes: {name}});

  const goToAvailableTodo = todo => linkTo(`/todos/available/${todo.id}`);

  return (
    <TodoListScreen
      onLoadTodos={loadAvailableTodos}
      onCreateTodo={createAvailableTodo}
      onPressTodo={goToAvailableTodo}
      noTodosMessage="You have no available todos. Nice work!"
    />
  );
}

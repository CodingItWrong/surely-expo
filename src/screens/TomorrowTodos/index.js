import {useLinkTo} from '@react-navigation/native';
import addDays from 'date-fns/addDays';
import startOfDay from 'date-fns/startOfDay';
import React, {useCallback} from 'react';
import {useTodos} from '../../data/todos';
import {groupByCategory} from '../../utils/grouping';
import TodoListScreen from '../TodoListScreen';

const today = now => startOfDay(new Date());
const tomorrow = now => addDays(today(now), 1);

export default function AvailableTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();

  const loadTomorrowTodos = useCallback(
    () =>
      todoClient
        .where({
          filter: {status: 'tomorrow'},
          options: {include: 'category'},
        })
        .then(todoResponse => ({todoGroups: groupByCategory(todoResponse)})),
    [todoClient],
  );
  const createTomorrowTodo = name =>
    todoClient.create({
      attributes: {name, 'deferred-until': tomorrow(new Date())},
    });

  const goToTomorrowTodo = todo => linkTo(`/todos/tomorrow/${todo.id}`);

  return (
    <TodoListScreen
      onLoadTodos={loadTomorrowTodos}
      onCreateTodo={createTomorrowTodo}
      onPressTodo={goToTomorrowTodo}
      noTodosMessage="You have no todos for tomorrow. Nice work!"
    />
  );
}

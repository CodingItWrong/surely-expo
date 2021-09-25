import {ResourceClient} from '@codingitwrong/jsonapi-client';
import React, {createContext, useContext, useMemo} from 'react';
import authenticatedHttpClient from './authenticatedHttpClient';
import {useToken} from './token';

const TodoContext = createContext(null);

export function TodoProvider({children}) {
  const {token} = useToken();

  const todoClient = useMemo(() => {
    const httpClient = authenticatedHttpClient({token});
    return new ResourceClient({name: 'todos', httpClient});
  }, [token]);

  return (
    <TodoContext.Provider value={todoClient}>{children}</TodoContext.Provider>
  );
}

export function useTodos() {
  const todoClient = useContext(TodoContext);
  return todoClient;
}

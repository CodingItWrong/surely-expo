import {ResourceClient} from '@codingitwrong/jsonapi-client';
import axios from 'axios';
import React, {createContext, useContext, useMemo} from 'react';
import baseUrl from '../baseUrl';
import {useToken} from './token';

const TodoContext = createContext(null);

export function TodoProvider({children}) {
  const {token} = useToken();

  const todoClient = useMemo(() => {
    const headers = {'Content-Type': 'application/vnd.api+json'};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const httpClient = axios.create({
      baseURL: baseUrl,
      headers,
    });
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

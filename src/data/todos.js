import {ResourceClient} from '@codingitwrong/jsonapi-client';
import {useMemo} from 'react';
import authenticatedHttpClient from './authenticatedHttpClient';
import {useToken} from './token';

export function useTodos() {
  const {token} = useToken();

  const todoClient = useMemo(() => {
    const httpClient = authenticatedHttpClient({token});
    return new ResourceClient({name: 'todos', httpClient});
  }, [token]);

  return todoClient;
}

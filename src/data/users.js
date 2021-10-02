import {ResourceClient} from '@codingitwrong/jsonapi-client';
import {useMemo} from 'react';
import authenticatedHttpClient from './authenticatedHttpClient';
import {useToken} from './token';

export function useUsers() {
  const {token} = useToken();

  const userClient = useMemo(() => {
    const httpClient = authenticatedHttpClient({token});
    return new ResourceClient({name: 'users', httpClient});
  }, [token]);

  return userClient;
}

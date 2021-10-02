import {ResourceClient} from '@codingitwrong/jsonapi-client';
import {useMemo} from 'react';
import authenticatedHttpClient from './authenticatedHttpClient';
import {useToken} from './token';

export function useCategories() {
  const {token} = useToken();

  const categoryClient = useMemo(() => {
    const httpClient = authenticatedHttpClient({token});
    return new ResourceClient({name: 'categories', httpClient});
  }, [token]);

  return categoryClient;
}

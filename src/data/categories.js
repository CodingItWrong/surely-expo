import {ResourceClient} from '@codingitwrong/jsonapi-client';
import React, {createContext, useContext, useMemo} from 'react';
import authenticatedHttpClient from './authenticatedHttpClient';
import {useToken} from './token';

const CategoryContext = createContext(null);

export function CategoryProvider({children}) {
  const {token} = useToken();

  const categoryClient = useMemo(() => {
    const httpClient = authenticatedHttpClient({token});
    return new ResourceClient({name: 'categories', httpClient});
  }, [token]);

  return (
    <CategoryContext.Provider value={categoryClient}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const categoryClient = useContext(CategoryContext);
  return categoryClient;
}

import {ResourceClient} from '@reststate/client';
import axios from 'axios';
import React, {createContext, useContext, useMemo} from 'react';
import baseUrl from '../baseUrl';
import {useToken} from './token';

const CategoryContext = createContext(null);

export function CategoryProvider({children}) {
  const {token} = useToken();

  const categoryClient = useMemo(() => {
    const headers = {'Content-Type': 'application/vnd.api+json'};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const httpClient = axios.create({
      baseURL: baseUrl,
      headers,
    });
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

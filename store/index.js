import React, {createContext, useContext, useEffect} from 'react';
import {useToken} from '../token';
import orbitStore, {setToken} from './store';

const StoreContext = createContext(null);

export function StoreProvider({children, store = orbitStore}) {
  const {token} = useToken();

  useEffect(() => {
    setToken(token);
  }, [token]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const store = useContext(StoreContext);
  return store;
}

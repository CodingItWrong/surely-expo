import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {deleteStringAsync, getStringAsync, setStringAsync} from '../storage';

const ACCESS_TOKEN_KEY = 'SURELY_ACCESS_TOKEN';

const TokenContext = createContext(null);

export function TokenProvider({children, loadToken = true}) {
  const [isTokenLoaded, setIsTokenLoaded] = useState(!loadToken);
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        isTokenLoaded,
        setIsTokenLoaded,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const {
    token,
    setToken: setTokenInternal,
    isTokenLoaded,
    setIsTokenLoaded,
  } = useContext(TokenContext);

  useEffect(() => {
    if (!isTokenLoaded) {
      getStringAsync(ACCESS_TOKEN_KEY).then(newToken => {
        if (newToken) {
          setToken(newToken).then(() => {
            setIsTokenLoaded(true);
          });
        } else {
          setIsTokenLoaded(true);
        }
      });
    }
  }, [setToken, isTokenLoaded, setIsTokenLoaded]);

  const setToken = useCallback(
    async function (newToken) {
      await setStringAsync(ACCESS_TOKEN_KEY, newToken);
      setTokenInternal(newToken);
    },
    [setTokenInternal],
  );

  async function clearToken() {
    await deleteStringAsync(ACCESS_TOKEN_KEY);
    setTokenInternal(null);
  }

  const isLoggedIn = isTokenLoaded && token !== null;

  return {isTokenLoaded, token, isLoggedIn, setToken, clearToken};
}

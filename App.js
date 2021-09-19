import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Navigation from './src/Navigation';
import OAuthLoginContainer from './src/auth/OAuthLoginContainer';
import {CategoryProvider} from './src/data/categories';
import {TodoProvider} from './src/data/todos';
import {TokenProvider} from './src/data/token';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <TokenProvider>
        <OAuthLoginContainer>
          {({logOut}) => (
            <TodoProvider>
              <CategoryProvider>
                <Navigation logOut={logOut} />
              </CategoryProvider>
            </TodoProvider>
          )}
        </OAuthLoginContainer>
      </TokenProvider>
    </PaperProvider>
  );
}

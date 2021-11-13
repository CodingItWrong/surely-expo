import {DarkTheme, DefaultTheme} from '@codingitwrong/react-native-paper';
import {useColorScheme} from 'react-native';

const SURELY_GREEN = '#4caf50';

export default function useTheme() {
  const colorScheme = useColorScheme();

  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: SURELY_GREEN,
    },
  };

  return theme;
}

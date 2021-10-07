import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme} from 'react-native-paper';

const SURELY_GREEN = '#4caf50';

export default function useTheme() {
  const colorScheme = useColorScheme();
  console.log({colorScheme});

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

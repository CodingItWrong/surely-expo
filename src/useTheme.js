import {useColorScheme} from 'react-native';
import {
  MD2DarkTheme as DarkTheme,
  MD2LightTheme as LightTheme,
} from 'react-native-paper';

const SURELY_GREEN = '#4caf50';

export default function useTheme() {
  const colorScheme = useColorScheme();

  const baseTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: SURELY_GREEN,
    },
  };

  return theme;
}

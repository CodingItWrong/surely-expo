import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme} from 'react-native-paper';

const SURELY_GREEN = '#4caf50';
// const SURELY_LIGHT_GREEN = '#e1ede2';
// const SURELY_DARK_GREEN = '#19241a';

const configValues = {
  2: {
    dark: {
      baseTheme: DarkTheme,
    },
    light: {
      baseTheme: DefaultTheme,
    },
  },
  // 3: {
  //   dark: {
  //     baseTheme: MD3DarkTheme,
  //     secondaryContainer: SURELY_DARK_GREEN,
  //   },
  //   light: {
  //     baseTheme: MD3LightTheme,
  //     secondaryContainer: SURELY_LIGHT_GREEN,
  //   },
  // },
};

const materialVersionToUse = 2;

export default function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';

  const {baseTheme} = configValues[materialVersionToUse][colorScheme];

  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: SURELY_GREEN,
      // secondaryContainer,
    },
  };

  return theme;
}

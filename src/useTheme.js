import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

export const SURELY_GREEN = '#4caf50';
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
  3: {
    dark: {
      ...MD3DarkTheme,
      colors: {
        primary: 'rgb(120, 220, 119)',
        onPrimary: 'rgb(0, 57, 10)',
        primaryContainer: 'rgb(0, 83, 19)',
        onPrimaryContainer: 'rgb(148, 249, 144)',
        secondary: 'rgb(186, 204, 179)',
        onSecondary: 'rgb(37, 52, 35)',
        secondaryContainer: 'rgb(59, 75, 56)',
        onSecondaryContainer: 'rgb(213, 232, 207)',
        tertiary: 'rgb(160, 207, 212)',
        onTertiary: 'rgb(0, 54, 59)',
        tertiaryContainer: 'rgb(31, 77, 82)',
        onTertiaryContainer: 'rgb(188, 235, 240)',
        error: 'rgb(255, 180, 171)',
        onError: 'rgb(105, 0, 5)',
        errorContainer: 'rgb(147, 0, 10)',
        onErrorContainer: 'rgb(255, 180, 171)',
        background: 'rgb(26, 28, 25)',
        onBackground: 'rgb(226, 227, 221)',
        surface: 'rgb(26, 28, 25)',
        onSurface: 'rgb(226, 227, 221)',
        surfaceVariant: 'rgb(66, 73, 64)',
        onSurfaceVariant: 'rgb(194, 201, 189)',
        outline: 'rgb(140, 147, 136)',
        outlineVariant: 'rgb(66, 73, 64)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(226, 227, 221)',
        inverseOnSurface: 'rgb(47, 49, 45)',
        inversePrimary: 'rgb(0, 110, 28)',
        elevation: {
          level0: 'transparent',
          level1: 'rgb(31, 38, 30)',
          level2: 'rgb(34, 43, 33)',
          level3: 'rgb(36, 49, 35)',
          level4: 'rgb(37, 51, 36)',
          level5: 'rgb(39, 55, 38)',
        },
        surfaceDisabled: 'rgba(226, 227, 221, 0.12)',
        onSurfaceDisabled: 'rgba(226, 227, 221, 0.38)',
        backdrop: 'rgba(44, 50, 42, 0.4)',
      },
    },
    light: {
      ...MD3LightTheme,
      colors: {
        primary: 'rgb(0, 110, 28)',
        onPrimary: 'rgb(255, 255, 255)',
        primaryContainer: 'rgb(148, 249, 144)',
        onPrimaryContainer: 'rgb(0, 34, 4)',
        secondary: 'rgb(82, 99, 79)',
        onSecondary: 'rgb(255, 255, 255)',
        secondaryContainer: 'rgb(213, 232, 207)',
        onSecondaryContainer: 'rgb(17, 31, 15)',
        tertiary: 'rgb(56, 101, 106)',
        onTertiary: 'rgb(255, 255, 255)',
        tertiaryContainer: 'rgb(188, 235, 240)',
        onTertiaryContainer: 'rgb(0, 32, 35)',
        error: 'rgb(186, 26, 26)',
        onError: 'rgb(255, 255, 255)',
        errorContainer: 'rgb(255, 218, 214)',
        onErrorContainer: 'rgb(65, 0, 2)',
        background: 'rgb(252, 253, 246)',
        onBackground: 'rgb(26, 28, 25)',
        surface: 'rgb(252, 253, 246)',
        onSurface: 'rgb(26, 28, 25)',
        surfaceVariant: 'rgb(222, 229, 216)',
        onSurfaceVariant: 'rgb(66, 73, 64)',
        outline: 'rgb(114, 121, 111)',
        outlineVariant: 'rgb(194, 201, 189)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(47, 49, 45)',
        inverseOnSurface: 'rgb(240, 241, 235)',
        inversePrimary: 'rgb(120, 220, 119)',
        elevation: {
          level0: 'transparent',
          level1: 'rgb(239, 246, 235)',
          level2: 'rgb(232, 242, 229)',
          level3: 'rgb(224, 237, 222)',
          level4: 'rgb(222, 236, 220)',
          level5: 'rgb(217, 233, 216)',
        },
        surfaceDisabled: 'rgba(26, 28, 25, 0.12)',
        onSurfaceDisabled: 'rgba(26, 28, 25, 0.38)',
        backdrop: 'rgba(44, 50, 42, 0.4)',
      },
    },
  },
};

const materialVersionToUse = 3;

export default function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';

  const theme = configValues[materialVersionToUse][colorScheme];

  return theme;
}

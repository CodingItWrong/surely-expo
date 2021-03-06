import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useToken} from '../data/token';
import {safeAreaMetrics} from '../testUtils';
import NavigationDrawer from './NavigationDrawer';

jest.mock('../data/token', () => ({useToken: jest.fn()}));

describe('NavigationDrawer', () => {
  const ICON_BY_ROUTE = {};

  it('allows navigating to the passed-in routes', () => {
    const navigation = {
      navigate: jest.fn().mockName('navigation.navigate'),
    };
    const route = {
      name: 'Available',
      key: '123',
    };
    const state = {
      routes: [route],
    };
    useToken.mockReturnValue({
      isLoggedIn: false,
    });

    render(
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <NavigationDrawer
          iconByRoute={ICON_BY_ROUTE}
          navigation={navigation}
          state={state}
        />
      </SafeAreaProvider>,
    );

    fireEvent.press(screen.getByText(route.name));

    expect(navigation.navigate).toHaveBeenCalledWith(route.name);
  });

  describe('when signed in', () => {
    it('allows signing out', async () => {
      const navigation = {
        navigate: jest.fn().mockName('navigation.navigate'),
      };
      const state = {
        routes: [],
      };
      const clearToken = jest.fn().mockName('clearToken');
      useToken.mockReturnValue({
        isLoggedIn: true,
        clearToken,
      });

      render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <NavigationDrawer
            iconByRoute={ICON_BY_ROUTE}
            navigation={navigation}
            state={state}
          />
        </SafeAreaProvider>,
      );

      fireEvent.press(screen.getByText('Sign out'));

      expect(clearToken).toHaveBeenCalledWith();

      await waitFor(() =>
        expect(navigation.navigate).toHaveBeenCalledWith('Sign in'),
      );
    });
  });
});

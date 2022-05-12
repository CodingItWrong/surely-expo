import {render} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import authenticatedHttpClient from '../data/authenticatedHttpClient';
import {TokenProvider} from '../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../testUtils';
import CategoryList from './CategoryList';

jest.mock('../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('CategoryList', () => {
  beforeEach(() => {
    mockUseFocusEffect();
  });

  it('lists categories from the server', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        data: {
          data: [
            {id: '1', attributes: {name: 'Category A'}},
            {id: '2', attributes: {name: 'Category B'}},
          ],
        },
      }),
    };
    authenticatedHttpClient.mockReturnValue(client);

    const {findByText, queryByText} = render(
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <TokenProvider loadToken={false}>
          <CategoryList />
        </TokenProvider>
      </SafeAreaProvider>,
    );

    await findByText('Category A');
    expect(queryByText('Category B')).not.toBeNull();
  });
});

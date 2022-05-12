import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';
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

  it('shows a message when no categories listed', async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        data: {
          data: [],
        },
      }),
    };
    authenticatedHttpClient.mockReturnValue(client);

    const {findByText} = render(
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <TokenProvider loadToken={false}>
          <CategoryList />
        </TokenProvider>
      </SafeAreaProvider>,
    );

    await findByText('No categories yet');
  });

  describe('when categories are loaded', () => {
    const categories = [
      {id: '1', attributes: {name: 'Category A'}},
      {id: '2', attributes: {name: 'Category B'}},
    ];

    function renderComponent() {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {
            data: categories,
          },
        }),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText, getByTestId, getByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <CategoryList />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {client, findByText, getByTestId, getByText, queryByText};
    }

    it('lists categories from the server', async () => {
      const {findByText, queryByText} = renderComponent();

      await findByText('Category A');
      expect(queryByText('Category B')).not.toBeNull();
    });

    it('allows navigating to create a category', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText, getByTestId} = renderComponent();

      await findByText('Category A');

      fireEvent.press(getByTestId('add-button'));
      expect(linkTo).toHaveBeenCalledWith('/categories/new');
    });

    it('allows navigating to a category detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText, getByText} = renderComponent();

      await findByText('Category A');
      fireEvent.press(getByText('Category A'));

      expect(linkTo).toHaveBeenCalledWith('/categories/1');
    });
  });
});

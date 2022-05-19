import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
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
      {
        id: 'cat1',
        attributes: {
          name: 'Category C',
          'sort-order': 3,
        },
      },
      {
        id: 'cat2',
        attributes: {
          name: 'Category B',
          'sort-order': 2,
        },
      },
      {
        id: 'cat3',
        attributes: {
          name: 'Category A',
          'sort-order': 1,
        },
      },
    ];

    function renderComponent() {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {
            data: categories,
          },
        }),
        patch: jest.fn().mockResolvedValue({data: {}}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText, getAllByLabelText, getByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <CategoryList />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {
        client,
        findByText,
        getAllByLabelText,
        getByText,
        queryByText,
      };
    }

    it('lists categories from the server', async () => {
      const {findByText, queryByText} = renderComponent();

      await findByText('Category A');
      expect(queryByText('Category B')).not.toBeNull();
    });

    it('allows navigating to create a category', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText, getByText} = renderComponent();

      await findByText('Category A');

      fireEvent.press(getByText('Add'));
      expect(linkTo).toHaveBeenCalledWith('/categories/new');
    });

    it('allows navigating to a category detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText, getByText} = renderComponent();

      await findByText('Category A');
      fireEvent.press(getByText('Category A'));

      expect(linkTo).toHaveBeenCalledWith('/categories/cat3');
    });

    function summarizeSortCalls(patchMock) {
      return patchMock.mock.calls.map(call => ({
        id: call[1].data.id,
        sortOrder: call[1].data.attributes['sort-order'],
      }));
    }

    it('allows moving an item down in the sort order', async () => {
      const {client, findByText, getAllByLabelText} = renderComponent();

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move down')[0]);

      await waitFor(() => expect(client.patch.mock.calls.length).toEqual(3));
      const calls = summarizeSortCalls(client.patch);
      expect(calls).toEqual([
        {sortOrder: 0, id: 'cat2'},
        {sortOrder: 1, id: 'cat3'},
        {sortOrder: 2, id: 'cat1'},
      ]);
    });

    it('shows a message when an error occurs moving an item down', async () => {
      const {client, findByText, getAllByLabelText} = renderComponent();

      client.patch.mockRejectedValue();

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move down')[0]);

      await findByText('An error occurred moving category down.');
    });

    it('allows moving an item up in the sort order', async () => {
      const {client, findByText, getAllByLabelText} = renderComponent();

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move up')[2]);

      await waitFor(() => expect(client.patch.mock.calls.length).toEqual(3));
      const calls = summarizeSortCalls(client.patch);
      expect(calls).toEqual([
        {sortOrder: 0, id: 'cat3'},
        {sortOrder: 1, id: 'cat1'},
        {sortOrder: 2, id: 'cat2'},
      ]);
    });

    it('shows a message when an error occurs moving an item up', async () => {
      const {client, findByText, getAllByLabelText} = renderComponent();

      client.patch.mockRejectedValue();

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move up')[0]);

      await findByText('An error occurred moving category up.');
    });
  });
});

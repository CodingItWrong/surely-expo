import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TokenProvider} from '../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../testUtils';
import CategoryList from './CategoryList';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('CategoryList', () => {
  beforeEach(() => {
    mockUseFocusEffect();
  });

  it('shows a message when no categories listed', async () => {
    nock('http://localhost:3000').get('/categories?').reply(200, {data: []});

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
      const mockedServer = nock('http://localhost:3000')
        .get('/categories?')
        .reply(200, {data: categories});

      const {findByText, getAllByLabelText, getByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <CategoryList />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {
        findByText,
        getAllByLabelText,
        getByText,
        mockedServer,
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

      const {findByText} = renderComponent();

      fireEvent.press(await findByText('Category A'));

      expect(linkTo).toHaveBeenCalledWith('/categories/cat3');
    });

    function mockSortCall({mockedServer, cat, sortOrder}) {
      mockedServer
        .patch(
          `/categories/${cat}?`,
          body => body.data.attributes['sort-order'] === sortOrder,
        )
        .reply(200, {data: {}});
    }

    it('allows moving an item down in the sort order', async () => {
      const {findByText, getAllByLabelText, mockedServer} = renderComponent();

      mockSortCall({mockedServer, cat: 'cat2', sortOrder: 0});
      mockSortCall({mockedServer, cat: 'cat3', sortOrder: 1});
      mockSortCall({mockedServer, cat: 'cat1', sortOrder: 2});
      mockedServer.get('/categories?').reply(200, {data: categories});

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move down')[0]);

      await waitFor(() => expect(mockedServer.isDone()).toBe(true));
    });

    it('shows a message when an error occurs moving an item down', async () => {
      const {findByText, getAllByLabelText, mockedServer} = renderComponent();

      mockedServer.patch('/categories/cat2?').reply(500, {});

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move down')[0]);

      await findByText('An error occurred moving category down.');
    });

    it('allows moving an item up in the sort order', async () => {
      const {findByText, getAllByLabelText, mockedServer} = renderComponent();

      mockSortCall({mockedServer, cat: 'cat3', sortOrder: 0});
      mockSortCall({mockedServer, cat: 'cat1', sortOrder: 1});
      mockSortCall({mockedServer, cat: 'cat2', sortOrder: 2});
      mockedServer.get('/categories?').reply(200, {data: categories});

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move up')[2]);

      await waitFor(() => expect(mockedServer.isDone()).toBe(true));
    });

    it('shows a message when an error occurs moving an item up', async () => {
      const {findByText, getAllByLabelText, mockedServer} = renderComponent();

      mockedServer.patch('/categories/cat2?').reply(500, {});

      await findByText('Category A');
      fireEvent.press(getAllByLabelText('Move up')[0]);

      await findByText('An error occurred moving category up.');
    });
  });
});

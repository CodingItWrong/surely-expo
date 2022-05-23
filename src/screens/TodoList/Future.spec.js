import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Future from './Future';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('Future', () => {
  const todo = {
    id: 'abc123',
    type: 'todos',
    attributes: {
      name: 'Todo 1',
      'deferred-until': '2121-08-28T23:54:49.483Z',
    },
  };

  beforeEach(() => {
    mockUseFocusEffect();
  });

  describe('when there are no available todos', () => {
    it('shows an error message', async () => {
      const response = {data: []};

      nock('http://localhost:3000')
        .get('/todos?filter[status]=future&filter[search]=&sort=name')
        .reply(200, response);

      const {findByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Future />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await findByText('You have no future todos. Nice work!');
    });
  });

  describe('when there are future todos', () => {
    const response = {data: [todo]};

    function renderComponent() {
      const mockedServer = nock('http://localhost:3000')
        .get('/todos?filter[status]=future&filter[search]=&sort=name')
        .reply(200, response);

      const {findByText, getByLabelText, getByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Future />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {
        findByText,
        getByLabelText,
        getByText,
        mockedServer,
        queryByText,
      };
    }

    it('displays future todos from the server', async () => {
      const {findByText, queryByText} = renderComponent();

      await findByText(todo.attributes.name);
      expect(queryByText('08/28/2121 (1)')).not.toBeNull();
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText} = renderComponent();

      fireEvent.press(await findByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/future/abc123');
    });

    it('allows searching for todos', async () => {
      const searchText = 'MySearchText';
      const {findByText, getByLabelText, mockedServer} = renderComponent();

      mockedServer
        .get(
          `/todos?filter[status]=future&filter[search]=${searchText}&sort=name`,
        )
        .reply(200, response);

      await findByText('Todo 1');

      const searchField = getByLabelText('search');
      fireEvent.changeText(searchField, searchText);
      fireEvent(searchField, 'submitEditing');

      await waitFor(() => expect(mockedServer.isDone()).toBe(true));
    });
  });
});

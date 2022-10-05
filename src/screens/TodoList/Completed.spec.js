import {useLinkTo} from '@react-navigation/native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import nock from 'nock';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Completed from './Completed';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('Completed', () => {
  const todo = {
    id: 'abc123',
    type: 'todos',
    attributes: {
      name: 'Todo 1',
      'completed-at': '2021-08-28T23:54:49.483Z',
    },
  };
  const todo2 = {
    id: 'abc123',
    type: 'todos',
    attributes: {
      name: 'Todo 2',
      'completed-at': '2021-08-28T23:54:49.483Z',
    },
  };

  beforeEach(() => {
    mockUseFocusEffect();
  });

  describe('when there are no completed todos', () => {
    it('shows a message', async () => {
      const response = {data: []};

      nock('http://localhost:3000')
        .get(
          '/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=1',
        )
        .reply(200, response);

      render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Completed />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await screen.findByText("You have no completed todos. You'll get there!");
    });
  });

  describe('when there are completed todos', () => {
    const response = {data: [todo]};

    function renderComponent() {
      const mockedServer = nock('http://localhost:3000')
        .get(
          '/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=1',
        )
        .reply(200, response);

      render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Completed />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {
        mockedServer,
      };
    }

    it('displays completed todos from the server', async () => {
      renderComponent();

      await screen.findByText(todo.attributes.name);
      expect(screen.queryByText('08/28/2021 (1)')).not.toBeNull();
    });

    it('allows pagination', async () => {
      const {mockedServer} = renderComponent();

      mockedServer
        .get(
          '/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=2',
        )
        .reply(200, {data: [todo2]})
        .get(
          '/todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=1',
        )
        .reply(200, {data: [todo]});

      await screen.findByText(todo.attributes.name);

      fireEvent.press(screen.getByLabelText('Go to next page'));
      await screen.findByText(todo2.attributes.name);

      fireEvent.press(screen.getByLabelText('Go to previous page'));
      await screen.findByText(todo.attributes.name);

      mockedServer.done();
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      renderComponent();

      fireEvent.press(await screen.findByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/completed/abc123');
    });

    describe('searching', () => {
      it('allows searching for todos', async () => {
        const searchText = 'MySearchText';
        const {mockedServer} = renderComponent();

        mockedServer
          .get(
            `/todos?filter[status]=completed&filter[search]=${searchText}&sort=-completedAt&page[number]=1`,
          )
          .reply(200, response);

        await screen.findByText('Todo 1');

        const searchField = screen.getByLabelText('search');
        fireEvent.changeText(searchField, searchText);
        fireEvent(searchField, 'submitEditing');

        await waitFor(() => expect(mockedServer.isDone()).toBe(true));
      });

      it('shows a message when no search results returned', async () => {
        const searchText = 'MySearchText';
        const {mockedServer} = renderComponent();

        mockedServer
          .get(
            `/todos?filter[status]=completed&filter[search]=${searchText}&sort=-completedAt&page[number]=1`,
          )
          .reply(200, {data: []});

        await screen.findByText('Todo 1');

        const searchField = screen.getByLabelText('search');
        fireEvent.changeText(searchField, searchText);
        fireEvent(searchField, 'submitEditing');

        await screen.findByText('No completed todos matched your search');
      });
    });
  });
});

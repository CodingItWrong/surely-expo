import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Deleted from './Deleted';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('Deleted', () => {
  const todo = {
    id: 'abc123',
    type: 'todos',
    attributes: {
      name: 'Todo 1',
      'deleted-at': '2021-08-28T23:54:49.483Z',
    },
  };
  const todo2 = {
    id: 'abc123',
    type: 'todos',
    attributes: {
      name: 'Todo 2',
      'deleted-at': '2021-08-28T23:54:49.483Z',
    },
  };

  beforeEach(() => {
    mockUseFocusEffect();
  });

  describe('when there are no deleted todos', () => {
    it('shows an error message', async () => {
      const response = {data: []};

      nock('http://localhost:3000')
        .get(
          '/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=1',
        )
        .reply(200, response);

      const {findByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Deleted />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await findByText(
        "You have no deleted todos. Don't be afraid to give up!",
      );
    });
  });

  describe('when there are deleted todos', () => {
    const response = {data: [todo]};

    function renderComponent() {
      const mockedServer = nock('http://localhost:3000')
        .get(
          '/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=1',
        )
        .reply(200, response);

      const {findByText, getByLabelText, queryByLabelText, queryByText} =
        render(
          <SafeAreaProvider initialMetrics={safeAreaMetrics}>
            <TokenProvider loadToken={false}>
              <Deleted />
            </TokenProvider>
          </SafeAreaProvider>,
        );

      return {
        findByText,
        getByLabelText,
        mockedServer,
        queryByLabelText,
        queryByText,
      };
    }

    it('displays deleted todos from the server', async () => {
      const {findByText, queryByText} = renderComponent();

      await findByText(todo.attributes.name);
      expect(queryByText('08/28/2021 (1)')).not.toBeNull();
    });

    it('allows pagination', async () => {
      const {findByText, getByLabelText, mockedServer} = renderComponent();

      mockedServer
        .get(
          '/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=2',
        )
        .reply(200, {data: [todo2]})
        .get(
          '/todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=1',
        )
        .reply(200, {data: [todo]});

      await findByText(todo.attributes.name);

      fireEvent.press(getByLabelText('Go to next page'));
      await findByText(todo2.attributes.name);

      fireEvent.press(getByLabelText('Go to previous page'));
      await findByText(todo.attributes.name);
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText} = renderComponent();

      fireEvent.press(await findByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/deleted/abc123');
    });

    describe('searching', () => {
      const searchText = 'MySearchText';

      it('allows searching for todos', async () => {
        const {findByText, getByLabelText, mockedServer, queryByLabelText} =
          renderComponent();

        mockedServer
          .get(
            `/todos?filter[status]=deleted&filter[search]=${searchText}&sort=-deletedAt&page[number]=1`,
          )
          .reply(200, response);

        await findByText('Todo 1');

        const searchField = getByLabelText('search');
        fireEvent.changeText(searchField, searchText);
        fireEvent(searchField, 'submitEditing');

        await waitFor(() => expect(queryByLabelText('Loading')).toBeNull());

        mockedServer.done();
      });

      it('shows a message when no search results returned', async () => {
        const {findByText, getByLabelText, mockedServer} = renderComponent();

        mockedServer
          .get(
            `/todos?filter[status]=deleted&filter[search]=${searchText}&sort=-deletedAt&page[number]=1`,
          )
          .reply(200, {data: []});

        await findByText('Todo 1');

        const searchField = getByLabelText('search');
        fireEvent.changeText(searchField, searchText);
        fireEvent(searchField, 'submitEditing');

        await findByText('No deleted todos matched your search');
      });
    });
  });
});

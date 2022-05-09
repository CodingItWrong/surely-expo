import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Deleted from './Deleted';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

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

  beforeEach(() => {
    mockUseFocusEffect();
  });

  describe('when there are no deleted todos', () => {
    it('shows an error message', async () => {
      const response = {data: []};

      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText, queryByText} = render(
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
      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {
        findByText,
        getByLabelText,
        getByText,
        queryByLabelText,
        queryByText,
      } = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Deleted />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {
        client,
        findByText,
        getByLabelText,
        getByText,
        queryByLabelText,
        queryByText,
      };
    }

    it('displays deleted todos from the server', async () => {
      const {client, findByText, queryByText} = renderComponent();

      await findByText(todo.attributes.name);
      expect(queryByText('08/28/2021 (1)')).not.toBeNull();

      expect(client.get).toHaveBeenCalledWith(
        'todos?filter[status]=deleted&filter[search]=&sort=-deletedAt&page[number]=1',
      );
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText, getByText} = renderComponent();

      await findByText('Todo 1');
      fireEvent.press(getByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/deleted/abc123');
    });

    it('allows searching for todos', async () => {
      const searchText = 'MySearchText';
      const {client, findByText, getByLabelText, queryByLabelText} =
        renderComponent();

      await findByText('Todo 1');

      const searchField = getByLabelText('search');
      fireEvent.changeText(searchField, searchText);
      fireEvent(searchField, 'submitEditing');

      expect(client.get).toHaveBeenLastCalledWith(
        `todos?filter[status]=deleted&filter[search]=${searchText}&sort=-deletedAt&page[number]=1`,
      );

      await waitFor(() => expect(queryByLabelText('Loading')).toBeNull());
    });
  });
});

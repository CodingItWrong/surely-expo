import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Tomorrow from './Tomorrow';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('Tomorrow', () => {
  const category = {
    id: 'c1',
    type: 'categories',
    attributes: {
      name: 'My Category',
      'sort-order': 1,
    },
  };
  const todo = {
    id: 'abc123',
    type: 'todos',
    attributes: {
      name: 'Todo 1',
    },
    relationships: {
      category: {
        data: {
          type: 'categories',
          id: category.id,
        },
      },
    },
  };

  beforeEach(() => {
    mockUseFocusEffect();
  });

  describe('when there are no tomorrow todos', () => {
    it('shows an error message', async () => {
      const response = {data: [], included: []};

      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Tomorrow />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await findByText('You have no todos for tomorrow. Nice work!');
    });
  });

  describe('when there are tomorrow todos', () => {
    const response = {data: [todo], included: [category]};

    function renderComponent() {
      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
        post: jest.fn().mockResolvedValue({data: {}}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText, getByTestId, getByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Tomorrow />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {client, findByText, getByTestId, getByText, queryByText};
    }

    it('displays tomorrow todos from the server', async () => {
      const {client, findByText, queryByText} = renderComponent();

      await findByText(todo.attributes.name);
      expect(queryByText(`${category.attributes.name} (1)`)).not.toBeNull();

      expect(client.get).toHaveBeenCalledWith(
        'todos?filter[status]=tomorrow&include=category',
      );
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText, getByText} = renderComponent();

      await findByText('Todo 1');
      fireEvent.press(getByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/tomorrow/abc123');
    });

    it('allows adding a todo', async () => {
      const todoName = 'My New Todo';

      const {client, findByText, getByTestId} = renderComponent();

      await findByText('Todo 1');

      const addField = getByTestId('new-todo-name');
      fireEvent.changeText(addField, todoName);
      fireEvent(addField, 'submitEditing');

      expect(client.post).toHaveBeenCalledWith(
        'todos?',
        {
          data: {
            type: 'todos',
            attributes: {name: todoName, 'deferred-until': expect.any(Date)},
          },
        },
        {headers: {'Content-Type': 'application/vnd.api+json'}},
      );

      await waitFor(() => expect(client.get).toHaveBeenCalledTimes(2));
    });
  });
});

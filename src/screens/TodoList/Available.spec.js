import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Available from './Available';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('Available', () => {
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

  describe('when there is an error loading todos', () => {
    it('shows an error message', async () => {
      const client = {
        get: jest.fn().mockRejectedValue(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Available />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await findByText('An error occurred while loading todos.');
    });
  });

  describe('when there are no available todos', () => {
    it('shows a message when no todos listed', async () => {
      const response = {
        data: [],
        included: [],
      };

      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Available />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await findByText('You have no available todos. Nice work!');
    });
  });

  describe('when there are available todos', () => {
    const response = {
      data: [todo],
      included: [category],
    };

    function renderComponent() {
      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
        post: jest.fn(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText, getByTestId, getByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Available />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {client, findByText, getByTestId, getByText, queryByText};
    }

    it('displays available todos from the server', async () => {
      const {client, findByText, queryByText} = renderComponent();

      await findByText(`${category.attributes.name} (1)`);
      expect(queryByText(todo.attributes.name)).not.toBeNull();

      expect(client.get).toHaveBeenCalledWith(
        'todos?filter[status]=available&include=category',
      );
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText, getByText} = renderComponent();

      await findByText('Todo 1');
      fireEvent.press(getByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/available/abc123');
    });

    describe('adding', () => {
      const todoName = 'My New Todo';

      it('allows adding a todo', async () => {
        const {client, findByText, getByTestId} = renderComponent();
        client.post.mockResolvedValue({data: {}});

        await findByText('Todo 1');

        const addField = getByTestId('new-todo-name');
        fireEvent.changeText(addField, todoName);
        fireEvent(addField, 'submitEditing');

        expect(client.post).toHaveBeenCalledWith(
          'todos?',
          {data: {type: 'todos', attributes: {name: todoName}}},
          {headers: {'Content-Type': 'application/vnd.api+json'}},
        );

        await waitFor(() => expect(client.get).toHaveBeenCalledTimes(2));
      });

      it('shows an error when adding a todo fails', async () => {
        const {client, findByText, getByTestId} = renderComponent();
        client.post.mockRejectedValue();

        await findByText('Todo 1');

        const addField = getByTestId('new-todo-name');
        fireEvent.changeText(addField, todoName);
        fireEvent(addField, 'submitEditing');

        await findByText(
          'An error occurred while creating the todo. Please try again.',
        );
      });
    });
  });
});

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
import Available from './Available';

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
      nock('http://localhost:3000')
        .get('/todos?filter[status]=available&include=category')
        .reply(500, {});

      render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Available />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await screen.findByText('An error occurred while loading todos.');
    });
  });

  describe('when there are no available todos', () => {
    it('shows a message when no todos listed', async () => {
      const response = {
        data: [],
        included: [],
      };

      nock('http://localhost:3000')
        .get('/todos?filter[status]=available&include=category')
        .reply(200, response);

      render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Available />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await screen.findByText('You have no available todos. Nice work!');
    });
  });

  describe('when there are available todos', () => {
    const response = {
      data: [todo],
      included: [category],
    };

    function renderComponent() {
      const mockedServer = nock('http://localhost:3000')
        .get('/todos?filter[status]=available&include=category')
        .reply(200, response);

      render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Available />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {mockedServer};
    }

    it('displays available todos from the server', async () => {
      renderComponent();

      await screen.findByText(`${category.attributes.name} (1)`);
      expect(screen.queryByText(todo.attributes.name)).not.toBeNull();
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      renderComponent();

      fireEvent.press(await screen.findByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/available/abc123');
    });

    describe('adding', () => {
      const todoName = 'My New Todo';

      it('allows adding a todo', async () => {
        const {mockedServer} = renderComponent();

        await screen.findByText('Todo 1');

        mockedServer
          .post('/todos?', {
            data: {type: 'todos', attributes: {name: todoName}},
          })
          .reply(200, {data: {}})
          .get('/todos?filter[status]=available&include=category')
          .reply(200, response);

        const addField = screen.getByLabelText('New todo name');
        fireEvent.changeText(addField, todoName);
        fireEvent(addField, 'submitEditing');

        // confirm post and second get are sent
        await waitFor(() => expect(mockedServer.isDone()).toBe(true));
      });

      it('shows an error when adding a todo fails', async () => {
        const {mockedServer} = renderComponent();

        mockedServer.post('/todos?').reply(500, {});

        await screen.findByText('Todo 1');

        const addField = screen.getByLabelText('New todo name');
        fireEvent.changeText(addField, todoName);
        fireEvent(addField, 'submitEditing');

        await screen.findByText(
          'An error occurred while creating the todo. Please try again.',
        );
      });
    });
  });
});

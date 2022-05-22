import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
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

      nock('http://localhost:3000')
        .get('/todos?filter[status]=available&include=category')
        .reply(200, response);

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
      const mockedServer = nock('http://localhost:3000')
        .get('/todos?filter[status]=available&include=category')
        .reply(200, response);

      const {findByText, getByLabelText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Available />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {findByText, getByLabelText, mockedServer, queryByText};
    }

    it('displays available todos from the server', async () => {
      const {findByText, queryByText} = renderComponent();

      await findByText(`${category.attributes.name} (1)`);
      expect(queryByText(todo.attributes.name)).not.toBeNull();
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText} = renderComponent();

      fireEvent.press(await findByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/available/abc123');
    });

    describe('adding', () => {
      const todoName = 'My New Todo';

      it('allows adding a todo', async () => {
        const {findByText, getByLabelText, mockedServer} = renderComponent();

        await findByText('Todo 1');

        mockedServer
          .post('/todos?', {
            data: {type: 'todos', attributes: {name: todoName}},
          })
          .reply(200, {data: {}})
          .get('/todos?filter[status]=available&include=category')
          .reply(200, response);

        const addField = getByLabelText('New todo name');
        fireEvent.changeText(addField, todoName);
        fireEvent(addField, 'submitEditing');

        // confirm post and second get are sent
        await waitFor(() => expect(mockedServer.isDone()).toBe(true));
      });

      it('shows an error when adding a todo fails', async () => {
        const {findByText, getByLabelText, mockedServer} = renderComponent();

        mockedServer.post('/todos?').reply(500, {});

        await findByText('Todo 1');

        const addField = getByLabelText('New todo name');
        fireEvent.changeText(addField, todoName);
        fireEvent(addField, 'submitEditing');

        await findByText(
          'An error occurred while creating the todo. Please try again.',
        );
      });
    });
  });
});

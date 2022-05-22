import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Tomorrow from './Tomorrow';

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
    it('shows a message', async () => {
      const response = {data: [], included: []};

      nock('http://localhost:3000')
        .get('/todos?filter[status]=tomorrow&include=category')
        .reply(200, response);

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
      const mockedServer = nock('http://localhost:3000')
        .get('/todos?filter[status]=tomorrow&include=category')
        .reply(200, response);

      const {findByText, getByLabelText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Tomorrow />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      return {findByText, getByLabelText, mockedServer, queryByText};
    }

    it('displays tomorrow todos from the server', async () => {
      const {findByText, queryByText} = renderComponent();

      await findByText(todo.attributes.name);
      expect(queryByText(`${category.attributes.name} (1)`)).not.toBeNull();
    });

    it('allows navigating to a todo detail', async () => {
      const linkTo = jest.fn().mockName('linkTo');
      useLinkTo.mockReturnValue(linkTo);

      const {findByText} = renderComponent();

      fireEvent.press(await findByText('Todo 1'));

      expect(linkTo).toHaveBeenCalledWith('/todos/tomorrow/abc123');
    });

    it('allows adding a todo', async () => {
      const todoName = 'My New Todo';

      const {findByText, getByLabelText, mockedServer} = renderComponent();

      mockedServer
        .post(
          '/todos?',
          body =>
            body.data.attributes.name === todoName &&
            body.data.attributes['deferred-until'] !== null,
        )
        .reply(200, {data: {}})
        .get('/todos?filter[status]=tomorrow&include=category')
        .reply(200, response);

      await findByText('Todo 1');

      const addField = getByLabelText('New todo name');
      fireEvent.changeText(addField, todoName);
      fireEvent(addField, 'submitEditing');

      // wait for post and second get
      await waitFor(() => expect(mockedServer.isDone()).toBe(true));
    });
  });
});

import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {TokenProvider} from '../../data/token';
import {createTodoDetail} from './index';

describe('TodoDetail', () => {
  const parentRouteName = 'AvailableTodos';
  const AvailableTodoDetail = createTodoDetail(parentRouteName);

  describe('when there is an error loading the todo', () => {
    const todoId = '42';
    const todo = {
      id: 'abc123',
      type: 'todos',
      attributes: {
        name: 'My Available Todo',
        notes: 'Notes for the todo',
        'created-at': '2021-08-27T23:54:49.483Z',
        'updated-at': '2021-08-27T23:54:49.483Z',
        'deleted-at': null,
        'completed-at': null,
        'deferred-at': null,
        'deferred-until': null,
      },
      relationships: {
        category: {
          data: null,
        },
      },
    };

    it('shows an error message', async () => {
      nock('http://localhost:3000')
        .get(`/todos/${todoId}?include=category`)
        .reply(500, {});

      const route = {params: {id: todoId}};
      const {findByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await findByText('An error occurred loading the todo.');
    });

    it('clears the error upon successful retry', async () => {
      nock('http://localhost:3000')
        .get(`/todos/${todoId}?include=category`)
        .reply(500, {})
        .get(`/todos/${todoId}?include=category`)
        .reply(200, {data: todo});

      const route = {params: {id: todoId}};
      const {findByText, queryByText, getByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await findByText('An error occurred loading the todo.');

      fireEvent.press(getByText('Retry'));

      await findByText(todo.attributes.name);
      expect(queryByText('An error occurred loading the todo.')).toBeNull();
    });
  });

  describe('when the todo is available', () => {
    const todo = {
      id: 'abc123',
      type: 'todos',
      attributes: {
        name: 'My Available Todo',
        notes: 'Notes for the todo',
        'created-at': '2021-08-27T23:54:49.483Z',
        'updated-at': '2021-08-27T23:54:49.483Z',
        'deleted-at': null,
        'completed-at': null,
        'deferred-at': null,
        'deferred-until': '2121-08-27T23:54:49.483Z',
      },
      relationships: {
        category: {
          data: null,
        },
      },
    };

    function setUp() {
      const mockServer = nock('http://localhost:3000')
        .get(`/todos/${todo.id}?include=category`)
        .reply(200, {data: todo});

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {findByText, getByTestId, getByText, queryByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      return {
        findByText,
        getByTestId,
        getByText,
        mockServer,
        navigation,
        queryByText,
      };
    }

    it('displays the todo content', async () => {
      const {findByText, queryByText} = setUp();

      await findByText(todo.attributes.name);
      expect(queryByText(todo.attributes.notes)).not.toBeNull();
      expect(queryByText('Created 08/27/2021')).not.toBeNull();
      expect(queryByText('Deferred until 08/27/2121')).not.toBeNull();
    });

    describe('completing the todo', () => {
      it('allows completing the todo', async () => {
        const {findByText, mockServer, navigation} = setUp();

        mockServer
          .patch(
            `/todos/${todo.id}?`,
            body =>
              body.data.id === todo.id &&
              body.data.attributes['completed-at'] !== null,
          )
          .reply(200, {data: {}});

        fireEvent.press(await findByText('Complete'));

        await waitFor(() =>
          expect(navigation.navigate).toHaveBeenCalledWith(parentRouteName),
        );
        mockServer.done();
      });

      it('shows a message when there is an error completing the todo', async () => {
        const {findByText, mockServer, navigation} = setUp();

        mockServer.patch(`/todos/${todo.id}?`).reply(500, {});

        fireEvent.press(await findByText('Complete'));

        await findByText('An error occurred marking the todo complete.');
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });

    describe('deleting the todo', () => {
      it('allows deleting the todo', async () => {
        const {findByText, mockServer, navigation} = setUp();

        mockServer
          .patch(
            `/todos/${todo.id}?`,
            body =>
              body.data.id === todo.id &&
              body.data.attributes['deleted-at'] !== null,
          )
          .reply(200, {data: {}});

        fireEvent.press(await findByText('Delete'));

        await waitFor(() =>
          expect(navigation.navigate).toHaveBeenCalledWith(parentRouteName),
        );
      });

      it('shows a message when there is an error deleting the todo', async () => {
        const {findByText, mockServer, navigation} = setUp();

        mockServer.patch(`/todos/${todo.id}?`).reply(500, {});

        fireEvent.press(await findByText('Delete'));

        await findByText('An error occurred deleting the todo.');
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });

    describe('deferring the todo', () => {
      it('allows deferring the todo', async () => {
        const {findByText, getByTestId, mockServer, navigation} = setUp();

        mockServer
          .patch(
            `/todos/${todo.id}?`,
            body =>
              body.data.id === todo.id &&
              body.data.attributes['deferred-until'] !== null,
          )
          .reply(200, {data: todo});

        fireEvent.press(await findByText('Defer'));
        fireEvent.press(getByTestId('defer-1-day-button'));

        await waitFor(() =>
          expect(navigation.navigate).toHaveBeenCalledWith(parentRouteName),
        );
      });

      it('shows a message when an error occurs deferring the todo', async () => {
        const {findByText, getByTestId, mockServer, navigation} = setUp();

        mockServer.patch(`/todos/${todo.id}?`).reply(500, {});

        fireEvent.press(await findByText('Defer'));
        fireEvent.press(getByTestId('defer-1-day-button'));

        await findByText('An error occurred deferring the todo.');
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the todo is completed', () => {
    const todo = {
      id: 'abc123',
      type: 'todos',
      attributes: {
        name: 'My Available Todo',
        notes: 'Notes for the todo',
        'created-at': '2021-08-27T23:54:49.483Z',
        'updated-at': '2021-08-27T23:54:49.483Z',
        'deleted-at': null,
        'completed-at': '2021-08-27T23:54:49.483Z',
        'deferred-at': null,
        'deferred-until': null,
      },
      relationships: {
        category: {
          data: null,
        },
      },
    };

    function setUp() {
      const mockServer = nock('http://localhost:3000')
        .get(`/todos/${todo.id}?include=category`)
        .reply(200, {data: todo});

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {findByText, getByText, queryByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      return {
        findByText,
        getByText,
        mockServer,
        navigation,
        queryByText,
      };
    }

    it('displays the completion date', async () => {
      const {findByText} = setUp();

      await findByText('Completed 08/27/2021');
    });

    it('allows uncompleting the todo', async () => {
      const {findByText, mockServer, navigation} = setUp();

      mockServer
        .patch(
          `/todos/${todo.id}?`,
          body =>
            body.data.id === todo.id &&
            body.data.attributes['completed-at'] === null,
        )
        .reply(200, {data: todo});

      fireEvent.press(await findByText('Uncomplete'));

      await waitFor(() => expect(navigation.navigate).not.toHaveBeenCalled());
    });

    it('shows a message when there is an error uncompleting the todo', async () => {
      const {findByText, mockServer} = setUp();

      mockServer.patch(`/todos/${todo.id}?`).reply(500, {});

      fireEvent.press(await findByText('Uncomplete'));

      await findByText('An error occurred marking the todo incomplete.');
    });
  });

  describe('when the todo is deleted', () => {
    const todo = {
      id: 'abc123',
      type: 'todos',
      attributes: {
        name: 'My Available Todo',
        notes: 'Notes for the todo',
        'created-at': '2021-08-27T23:54:49.483Z',
        'updated-at': '2021-08-27T23:54:49.483Z',
        'deleted-at': '2021-08-29T23:54:49.483Z',
        'completed-at': '2021-08-28T23:54:49.483Z',
        'deferred-at': null,
        'deferred-until': null,
      },
      relationships: {
        category: {
          data: null,
        },
      },
    };

    function setUp() {
      const mockServer = nock('http://localhost:3000')
        .get(`/todos/${todo.id}?include=category`)
        .reply(200, {data: todo});

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {findByText, getByText, queryByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      return {
        findByText,
        getByText,
        mockServer,
        navigation,
        queryByText,
      };
    }

    it('displays the todo dates', async () => {
      const {findByText, queryByText} = setUp();

      await findByText('Completed 08/28/2021');
      expect(queryByText('Deleted 08/29/2021')).not.toBeNull();
    });

    it('allows undeleting the todo', async () => {
      const {findByText, mockServer, navigation} = setUp();

      mockServer
        .patch(
          `/todos/${todo.id}?`,
          body =>
            body.data.id === todo.id &&
            body.data.attributes['deleted-at'] === null,
        )
        .reply(200, {data: todo});

      fireEvent.press(await findByText('Undelete'));

      await waitFor(() => expect(navigation.navigate).not.toHaveBeenCalled());

      mockServer.done();
    });

    it('shows a message when there is an error undeleting the todo', async () => {
      const {findByText, mockServer} = setUp();

      mockServer.patch(`/todos/${todo.id}?`).reply(500, {});

      fireEvent.press(await findByText('Undelete'));

      await findByText('An error occurred undeleting the todo.');
    });
  });
});

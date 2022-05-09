import {render} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Future from './Future';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

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

      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
      };
      authenticatedHttpClient.mockReturnValue(client);

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
    it('displays future todos from the server', async () => {
      const response = {data: [todo]};

      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Future />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await findByText(todo.attributes.name);
      expect(queryByText('08/28/2121 (1)')).not.toBeNull();

      expect(client.get).toHaveBeenCalledWith(
        'todos?filter[status]=future&filter[search]=&sort=name',
      );
    });
  });
});

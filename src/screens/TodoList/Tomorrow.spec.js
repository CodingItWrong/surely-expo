import {render} from '@testing-library/react-native';
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
    it('displays tomorrow todos from the server', async () => {
      const response = {data: [todo], included: [category]};

      const client = {
        get: jest.fn().mockResolvedValue({data: response}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const {findByText, queryByText} = render(
        <SafeAreaProvider initialMetrics={safeAreaMetrics}>
          <TokenProvider loadToken={false}>
            <Tomorrow />
          </TokenProvider>
        </SafeAreaProvider>,
      );

      await findByText(todo.attributes.name);
      expect(queryByText(`${category.attributes.name} (1)`)).not.toBeNull();

      expect(client.get).toHaveBeenCalledWith(
        'todos?filter[status]=tomorrow&include=category',
      );
    });
  });
});

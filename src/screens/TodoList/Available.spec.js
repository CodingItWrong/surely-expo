import {render} from '@testing-library/react-native';
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

  it('displays available todos from the server', async () => {
    const response = {
      data: [todo],
      included: [category],
    };

    const client = {
      get: jest.fn().mockResolvedValue({data: response}),
    };
    authenticatedHttpClient.mockReturnValue(client);

    const {findByText, queryByText} = render(
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <TokenProvider loadToken={false}>
          <Available />
        </TokenProvider>
      </SafeAreaProvider>,
    );

    await findByText(`${category.attributes.name} (1)`);
    expect(queryByText(todo.attributes.name)).not.toBeNull();

    expect(client.get).toHaveBeenCalledWith(
      'todos?filter[status]=available&include=category',
    );
  });

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

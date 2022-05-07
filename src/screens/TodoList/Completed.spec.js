import {render} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import {mockUseFocusEffect, safeAreaMetrics} from '../../testUtils';
import Completed from './Completed';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  useLinkTo: jest.fn(),
}));

describe('Completed', () => {
  const todo = {
    id: 'abc123',
    type: 'todos',
    attributes: {
      name: 'Todo 1',
      'completed-at': '2021-08-28T23:54:49.483Z',
    },
  };

  beforeEach(() => {
    mockUseFocusEffect();
  });

  it('displays completed todos from the server', async () => {
    const response = {data: [todo]};

    const client = {
      get: jest.fn().mockResolvedValue({data: response}),
    };
    authenticatedHttpClient.mockReturnValue(client);

    const {findByText, queryByText} = render(
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <TokenProvider loadToken={false}>
          <Completed />
        </TokenProvider>
      </SafeAreaProvider>,
    );

    await findByText(todo.attributes.name);
    expect(queryByText('08/28/2021 (1)')).not.toBeNull();

    expect(client.get).toHaveBeenCalledWith(
      'todos?filter[status]=completed&filter[search]=&sort=-completedAt&page[number]=1',
    );
  });
});

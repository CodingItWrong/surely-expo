import Coordinator, {
  EventLoggingStrategy,
  LogTruncationStrategy,
  RequestStrategy,
  SyncStrategy,
} from '@orbit/coordinator';
import JSONAPISource from '@orbit/jsonapi';
import MemorySource from '@orbit/memory';
import {Platform} from 'react-native';
import {token} from '../env';
import schema from './schema';

const baseURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const memory = new MemorySource({schema});

memory.requestQueue.on('fail', () => {
  memory.requestQueue.skip();
});

const remote = new JSONAPISource({
  schema,
  name: 'remote',
  host: baseURL,
});

// see https://github.com/orbitjs/orbit/issues/454
remote.requestProcessor.defaultFetchSettings.headers.Authorization = `Bearer ${token}`;

remote.requestQueue.on('fail', () => {
  remote.requestQueue.skip();
});

const coordinator = new Coordinator({
  sources: [memory, remote],
});

// Query the remote server whenever the store is queried
coordinator.addStrategy(
  new RequestStrategy({
    source: 'memory',
    on: 'beforeQuery',
    target: 'remote',
    action: 'query',
    blocking: true,
  }),
);

// Update the remote server whenever the store is updated
coordinator.addStrategy(
  new RequestStrategy({
    source: 'memory',
    on: 'beforeUpdate',
    target: 'remote',
    action: 'update',
    blocking: true,
  }),
);

// Sync all changes received from the remote server to the store
coordinator.addStrategy(
  new SyncStrategy({
    source: 'remote',
    target: 'memory',
    blocking: true,
  }),
);

// log events to console
coordinator.addStrategy(new EventLoggingStrategy());

// truncate transform logs
coordinator.addStrategy(
  new LogTruncationStrategy({
    sources: ['memory', 'remote'],
  }),
);

coordinator.activate();

export default memory;

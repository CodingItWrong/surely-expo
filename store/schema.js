import {Schema} from '@orbit/data';

const schema = new Schema({
  models: {
    todo: {
      attributes: {
        name: {type: 'string'},
        notes: {type: 'string'},
        completedAt: {type: 'date-time'},
        deletedAt: {type: 'date-time'},
        deferredAt: {type: 'date-time'},
        deferredUntil: {type: 'date'},
      },
    },
  },
});

export default schema;

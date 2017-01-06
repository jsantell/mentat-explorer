import Immutable from 'immutable';


const DUMMY_SCHEMA = (function() {
  const generateField = name => {
    return {
      doc: `The ${name} field`,
      fulltext: true,
      index: true,
      cardinality: ':db.cardinality/one',
      valueType: ':db.type/string',
      ident: `:artist/${name}`,
    };
  };

  return {
    ':artist': {
      fields: (function() {
        return ['country', 'endDay', 'endMonth', 'gender', 'id', 'name'].map(generateField);
      })(),
    },
  };
});

const STATES = {
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
};

const Connection = Immutable.Record({
  name: '',
  state: STATES.DISCONNECTED,
  address: '',
  version: null,
  schema: null,
}, 'Connection');

Connection.STATES = STATES;
Connection.DUMMY_SCHEMA = DUMMY_SCHEMA;

export default Connection;

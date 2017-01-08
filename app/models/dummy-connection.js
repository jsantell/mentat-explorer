import Connection from './connection';
import { wait } from '../lib/utils';

/**
 * If we're in a browser/UI/'real' experience, set the delay of the dummy requests
 * to a realistic amount; otherwise, if in test mode, make it snappy
 */
const DUMMY_DELAY = typeof window === 'object' ? 1000 : 1;

const DUMMY_SCHEMA = (function() {
  const generateField = name => {
    return {
      doc: `The ${name} field`,
      fulltext: 'true',
      index: 'true',
      cardinality: ':db.cardinality/one',
      valueType: ':db.type/string',
      ident: `:artist/${name}`,
    };
  };

  const schema = {
    ':artist': ['country', 'endDay', 'endMonth', 'gender', 'id', 'name'],
    ':album': ['country', 'id', 'name'],
    ':recordlabel': ['country', 'id', 'name'],
  };

  Object.keys(schema).forEach(ns => {
    const attrs = schema[ns];
    schema[ns] = {};
    attrs.forEach(attr => {
      schema[ns][attr] = generateField(attr);
    });
  });

  return schema;
})();

class DummyConnection extends Connection {
  async fetchSchema() {
    await wait(DUMMY_DELAY);
    return DUMMY_SCHEMA;
  }

  async query(q) {
    await wait(DUMMY_DELAY);
    return {};
  }
};

export default DummyConnection;

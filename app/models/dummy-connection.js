import Connection from './connection';

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
    return DUMMY_SCHEMA;
  }

  async query(q) {
    return {};
  }
};

export default DummyConnection;

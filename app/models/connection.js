import Immutable from 'immutable';
import Schema from './schema';

const FETCH_OPTIONS = {
  headers: {
    'Accept': 'application/edn',
    'Content-Type': 'application/edn',
  },
};

const Connection = Immutable.Record({
  address: '',
  schema: new Schema(),

  async fetchSchema() {
    return this.query(`
      [:find ?e ?i ?type ?cardinality :where
        [_ :db.install/attribute ?e]
        [?e :db/ident ?i]
        [?e :db/valueType ?t]
        [?t :db/ident ?type]
        [?e :db/cardinality ?c]
        [?c :db/ident ?cardinality]]
    `);
  },

  async query(q) {
    const url = `${this.get('address')}/api/query?q=${encodeURIComponent(q)}`;
    const res = await fetch(url, FETCH_OPTIONS);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }

    try {
      const text = await res.text();
      return JSON.parse(text);
    } catch (e) {
      throw new Error('Could not parse response from server.');
    }
  },

  fetchEntity(eid) {
    return this.query(`
      [:find ?attrVal ?val :where [${eid} ?attr ?b] [?attr :db/ident ?attrVal]]
    `)
  },

}, 'Connection');

export default Connection;

import Immutable from 'immutable';
import Schema from './schema';

const FETCH_OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const Connection = Immutable.Record({
  address: '',
  schema: new Schema(),

  async fetchSchema() {
    return this.query('{ :schema }');
  },

  async query(q) {
    const url = `${this.get('address')}/api/query?q=${encodeURIComponent(q)}`;
    const res = await fetch(url, FETCH_OPTIONS);
    return res.json();
  },

}, 'Connection');

export default Connection;

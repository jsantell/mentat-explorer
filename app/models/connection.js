import Immutable from 'immutable';
import Schema from './schema';

const Connection = Immutable.Record({
  address: '',
  schema: new Schema(),

  async fetchSchema() {
    return this.query('{ :schema }');
  },

  async query(q) {
    const res = await fetch(`${this.get('address')}/query?q=${q}`);
    return res.json();
  },

}, 'Connection');

export default Connection;

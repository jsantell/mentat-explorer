import Immutable from 'immutable';
import Connection from './connection';
import UI from './ui';

export const State = Immutable.Record({
  connection: null, // new Connection(),
  queries: Immutable.List(),
  ui: new UI(),
}, 'State');

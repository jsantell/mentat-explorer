import Immutable from 'immutable';
import Connection from './connection';
import UI from './ui';

export const State = Immutable.Record({
  connection: null, // new Connection(),
  ui: new UI(),
}, 'State');

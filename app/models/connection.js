import Immutable from 'immutable';

const STATES = {
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
};

const Connection = Immutable.Record({
  name: '',
  state: STATES.DISCONNECTED,
  address: '',
  data: null,
}, 'Connection');

Connection.STATES = STATES;

export default Connection;

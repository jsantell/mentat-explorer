import Connection from '../models/connection';

/* ui */
export const showCreateConnectionModal = state => state.getIn(['ui', 'showCreateConnectionModal']);

/* connection */
export const getConnection = state => state.get('connection');
export const isConnected = state => state.getIn(['connection', 'state']) === Connection.STATES.CONNECTED;

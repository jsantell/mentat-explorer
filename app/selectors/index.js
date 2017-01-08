import Connection from '../models/connection';

/* ui */
export const showCreateConnectionModal = state => state.getIn(['ui', 'showCreateConnectionModal']);

/* connection */
export const getConnection = state => state.get('connection');
export const getConnectionAddress = state => state.getIn(['connection', 'address']);
export const getSchema = state => state.getIn(['connection', 'schema']);
export const getSchemaData = state => state.getIn(['connection', 'schema', 'data']);
export const getSchemaState = state => state.getIn(['connection', 'schema', 'state']);

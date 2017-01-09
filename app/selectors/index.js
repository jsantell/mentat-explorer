import Connection from '../models/connection';

/* ui */
export const showCreateConnectionModal = state => state.getIn(['ui', 'showCreateConnectionModal']);
export const getErrors = state => state.getIn(['ui', 'errors']);
export const getMostRecentError = state => state.getIn(['ui', 'errors']).last();

/* connection */
export const getConnection = state => state.get('connection');
export const getConnectionAddress = state => state.getIn(['connection', 'address']);
export const getSchema = state => state.getIn(['connection', 'schema']);
export const getSchemaData = state => state.getIn(['connection', 'schema', 'data']);
export const getSchemaState = state => state.getIn(['connection', 'schema', 'state']);

/* queries */
export const getQuery = (state, id) => state.getIn(['queries', id]);
export const getMostRecentQuery = state => state.get('queries').last();

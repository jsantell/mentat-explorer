import { combineReducers } from 'redux-immutable';
import connection from './connection';
import ui from './ui';
import queries from './queries';

const reducer = combineReducers({
  connection,
  ui,
  queries,
});

export default reducer;

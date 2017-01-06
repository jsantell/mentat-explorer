import { combineReducers } from 'redux-immutable';
import connection from './connection';
import ui from './ui';

const reducer = combineReducers({
  connection,
  ui,
});

export default reducer;

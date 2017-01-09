import Immutable from 'immutable';
import { constantify } from '../lib/utils';
const _ = null;

const STATES = constantify({
  LOADING: _,
  LOADED: _,
  FAILED: _,
});

const Query = Immutable.Record({
  id: null,
  src: '',
  results: null,
  state: STATES.LOADING,
}, 'Query');

Query.STATES = STATES;
Query.isValidState = state => Object.keys(STATES).indexOf(state) !== -1;
Query.MAX_QUERY_HISTORY = 5;

export default Query;

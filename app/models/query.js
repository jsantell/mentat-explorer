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
  result: null,
  state: STATES.UNINITIALIZED,

}, 'Query');

Query.STATES = STATES;
Query.isValidState = state => Object.keys(STATES).indexOf(state) !== -1;

export default Query;

import Immutable from 'immutable';
import { constantify } from '../lib/utils';
const _ = null;

const STATES = constantify({
  UNINITIALIZED: _,
  LOADING: _,
  LOADED: _,
  FAILED: _,
});

const Schema = Immutable.Record({
  state: STATES.UNINITIALIZED,
  data: {},
}, 'Schema');

Schema.STATES = STATES;

export default Schema;

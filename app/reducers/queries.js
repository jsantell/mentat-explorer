import assert from 'assert';
import Immutable from 'immutable';
import types from '../constants/action-types';
import Query from '../models/query';

const MAX_QUERY_HISTORY = 5;

const initialState = Immutable.List();

export default function (state=initialState, action) {
  switch (action.type) {
    case types.CLEAR_QUERIES:
      return clearQueries(state);
    case types.CREATE_QUERY:
      return createQuery(state, action.id, action.src);
    case types.SET_QUERY:
      return setQuery(state, action.id, action.results, action.state);
  }
  return state;
}

function clearQueries (state) {
  return initialState;
}

function createQuery (state, id, src) {
  assert(typeof id === 'number', 'Query must have an id.');
  assert(!state.get(id), 'Query with id must not already exist.');

  state = state.push(new Query({
    id,
    src,
  }));

  while (state.size > MAX_QUERY_HISTORY) {
    state = state.shift();
  }

  return state;
}

function setQuery (state, id, results, queryState) {
  assert(state.get(id), 'Query id must be found in queries.');
  assert(queryState === undefined || Query.isValidState(queryState), 'Query must be a valid state.');

  if (results !== undefined) {
    state = state.setIn([id, 'results'], results);
  }

  if (queryState !== undefined) {
    state = state.setIn([id, 'state'], queryState);
  }

  return state;
}

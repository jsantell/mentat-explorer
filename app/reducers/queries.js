import assert from 'assert';
import Immutable from 'immutable';
import types from '../constants/action-types';
import Query from '../models/query';
import * as selectors from '../selectors';

const MAX_QUERY_HISTORY = Query.MAX_QUERY_HISTORY;

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
  assert(state.findIndex(q => q.get('id') === id) === -1, 'Query with id must not already exist.');

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
  const index = state.findIndex(q => q.get('id') === id);

  // TODO If query not found, abort request -- this could happen if we shift out older queries
  // that are just being completed. Unlikely in a real setting, should think about this
  // some more.
  try {
    assert(index !== -1, 'Query id must be found in queries.');
    assert(queryState === undefined || Query.isValidState(queryState), 'Query must be a valid state.');
  } catch (e) {
    return state;
  }

  if (results !== undefined) {
    state = state.update(index, q => q.set('results', results));
  }

  if (queryState !== undefined) {
    state = state.update(index, q => q.set('state', queryState));
  }

  return state;
}

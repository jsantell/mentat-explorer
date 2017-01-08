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
  assert(id, 'Query must have an id');

  return state.withMutation(mut => {
    mut.push(new Query({
      id,
      src,
    }));

    while (mut.size > MAX_QUERY_HISTORY) {
      mut.shift();
    }
  });
}

function setQuery (state, id, results, queryState) {
  assert(state.get(id), 'Query id must be found in queries.');
  assert(queryState === undefined || Query.isValidState(queryState), 'Query must be a valid state.');

  return state.withMutations(mut => {
    if (results !== undefined) {
      mut.update(id, query => query.set('results', results));
    }
    if (queryState !== undefined) {
      mut.update(id, query => query.set('state', state));
    }
  });
}

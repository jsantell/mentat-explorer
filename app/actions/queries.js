import assert from 'assert';
import types from '../constants/action-types';
import * as selectors from '../selectors';
import Query from '../models/query';

let QUERY_INC = 0;

function clearQueries () {
  return {
    type: types.CLEAR_QUERIES,
  };
};

function createQuery ({ id, src }) {
  return {
    type: types.CREATE_QUERY,
    src,
    id,
  };
};

function setQuery ({ id, results, state }) {
  return {
    type: types.SET_QUERY,
    results,
    state,
    id,
  };
}

export function query (src) {
  return async function (dispatch, getState) {
    const connection = selectors.getConnection(getState());
    assert(connection, 'Cannot execute query without a connection.');

    const id = QUERY_INC++;

    try {
      await dispatch(createQuery({ id, src }));

      const query = selectors.getQuery(getState(), id);
      const results = await connection.query(src);

      await dispatch(setQuery({ id, results, state: Query.STATES.LOADED }));
    } catch (e) {
      console.error(e);
      await dispatch(setQuery({ id, state: Query.STATES.FAILED }));
    }
  };
};

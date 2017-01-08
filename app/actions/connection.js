import assert from 'assert';
import types from '../constants/action-types';
import Connection from '../models/connection';
import Schema from '../models/schema';
import * as selectors from '../selectors';

function setConnection (address, options={}) {
  return {
    type: types.SET_CONNECTION,
    address,
    options,
  };
};

function setSchema ({ data, state }) {
  return {
    type: types.SET_SCHEMA,
    data,
    state,
  };
};

export function connect (address, options={}) {
  return async function (dispatch, getState) {
    let { dummy, remember } = options;

    await dispatch(setConnection(address, options));
    await dispatch(fetchSchema());
  };
};

export function fetchSchema () {
  return async function (dispatch, getState) {
    const connection = selectors.getConnection(getState());

    assert(connection, 'Cannot fetch schema without a connection.');

    try {
      await dispatch(setSchema({ data: null, state: Schema.STATES.LOADING }));
      const schema = await connection.fetchSchema();

      if (schema) {
        await dispatch(setSchema({ data: schema, state: Schema.STATES.LOADED }));
      } else {
        await dispatch(setSchema({ data: null, state: Schema.STATES.FAILED }));
      }
    } catch (e) {
      console.error(e);
      await dispatch(setSchema({ data: null, state: Schema.STATES.FAILED }));
    }
  };
};

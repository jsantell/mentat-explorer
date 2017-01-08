import assert from 'assert';
import Immutable from 'immutable';
import types from '../constants/action-types';
import Connection from '../models/connection';
import DummyConnection from '../models/dummy-connection';

const initialState = new Connection();

export default function (state=initialState, action) {
  switch (action.type) {
    case types.SET_CONNECTION:
      return setConnection(state, action.address, action.options);
    case types.SET_SCHEMA:
      return setSchema(state, action.data, action.state);
  }
  return state;
}

function setConnection (state, address, options) {
  if (address === null) {
    return null;
  }

  if (options.dummy) {
    return new DummyConnection({ address });
  }

  return new Connection({
    address,
  });
}

function setSchema (state, data, schemaState) {
  return state.withMutations(mut => {
    if (data !== undefined) {
      mut.setIn(['schema', 'data'], data);
    }
    if (schemaState !== undefined) {
      mut.setIn(['schema', 'state'], schemaState);
    }
  });
}


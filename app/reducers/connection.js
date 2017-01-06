import assert from 'assert';
import Immutable from 'immutable';
import types from '../constants/action-types';
import Connection from '../models/connection';

const initialState = new Connection();

export default function (state=initialState, action) {
  switch (action.type) {
    case types.SET_CONNECTION:
      return setConnection(state, action.name, action.address, action.state, action.data);
  }
  return state;
}

function setConnection (state, name, address, connectionState, data) {
  if (!address) {
    return null;
  }

  return new Connection({
    name,
    address,
    data,
    state: connectionState,
  });
}

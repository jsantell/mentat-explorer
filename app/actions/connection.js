import types from '../constants/action-types';
import Connection from '../models/connection';

export function setConnection (name, address, state, data) {
  return {
    type: types.SET_CONNECTION,
    name,
    address,
    state,
    data,
  };
};

export function connect (name, address, options={}) {
  return async function (dispatch, getState) {
    let { remember } = options;

    try {
      await dispatch(setConnection(name, address, Connection.STATES.CONNECTING));
      const res = await fetch(`${address}`);
      const data = await res.json();

      await dispatch(setConnection(name, address, Connection.STATES.CONNECTED, data));
    } catch (e) {
      const error = `Unable to connect to ${address}`;
      await dispatch(setConnection(name, address, Connection.STATES.DISCONNECTED, { error }));
    }
  };
};

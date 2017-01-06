import types from '../constants/action-types';

export function showCreateConnectionModal () {
  return {
    type: types.SHOW_CREATE_CONNECTION_MODAL,
  };
};

export function hideCreateConnectionModal () {
  return {
    type: types.HIDE_CREATE_CONNECTION_MODAL,
  };
};
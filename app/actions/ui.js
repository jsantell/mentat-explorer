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

export function createError (error) {
  return {
    type: types.CREATE_ERROR,
    error,
  };
}

export function hideError (id) {
  return {
    type: types.HIDE_ERROR,
    id,
  };
}

export function setCurrentView(view) {
  return {
    type: types.SET_CURRENT_VIEW,
    view,
  };
};


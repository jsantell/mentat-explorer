import assert from 'assert';
import Immutable from 'immutable';
import types from '../constants/action-types';
import UI from '../models/ui';

const initialState = new UI();

export default function (state=initialState, action) {
  switch (action.type) {
    case types.SHOW_CREATE_CONNECTION_MODAL:
      return setUIState(state, 'showCreateConnectionModal', true);
    case types.HIDE_CREATE_CONNECTION_MODAL:
      return setUIState(state, 'showCreateConnectionModal', false);
  }
  return state;
}

function setUIState (state, prop, value) {
  return state.set(prop, value);
}

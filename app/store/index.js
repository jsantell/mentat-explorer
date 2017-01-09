import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import { State } from '../models';
import * as uiActions from '../actions/ui';

const logger = store => next => action => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    return next(action);
  }

  if (typeof action.type === 'string') {
    console.log("LOG", action);
  }

  return next(action);
};

/**
 * Tiny middleware that handles accepting functions (thunks) and promises/async functions
 * and handles them, and dispatches a `createError` action if it errors.
 */
const thunk = store => next => action => {
  const { dispatch, getState } = store;
  if (typeof action === 'function') {
    const result = action(dispatch, getState);
    if (typeof result.catch === 'function') {
      return result.catch(e => dispatch(uiActions.createError(e)));
    } else {
      return result;
    }
  }
  return next(action);
};

const globalDebugging = store => next => action => {
  if (process.env.NODE_ENV === 'production') {
    return next(action);
  }
  return next(action);
};

export default function () {
  const middleware = [logger, globalDebugging, thunk];
  const state = new State();

  return createStore(reducers, state, applyMiddleware(...middleware));
}

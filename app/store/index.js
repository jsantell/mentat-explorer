import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import { State } from '../models';

const logger = store => next => action => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    return next(action);
  }

  if (typeof action.type === 'string') {
    console.log("LOG", action);
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
  const middleware = [logger, globalDebugging, thunkMiddleware];
  const state = new State();

  return createStore(reducers, state, applyMiddleware(...middleware));
}

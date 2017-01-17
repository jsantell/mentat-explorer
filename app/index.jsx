import 'babel-polyfill';
import 'whatwg-fetch'
import qs from 'querystring';
import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './containers/app';
import muiTheme from './lib/material-theme';
import errorListener from './lib/error-listener';
import * as connectionActions from './actions/connection';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// Currently the react-treeview-mui component explicitly uses this
// dependency to handle clicks
injectTapEventPlugin();

const store = createStore();

// Use errorListener to subscribe to new errors in state and subsequently
// fire an action to hide them after a few seconds
errorListener(store);

// Auto-connect if the URL has a `?host=` query parameter.
const queryParams = qs.parse(document.location.search.replace(/^\?/, ''));
if (queryParams.host) {
  store.dispatch(connectionActions.connect(queryParams.host));
}

const wrapper = (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
);

const container = document.getElementById('container');
ReactDOM.render(wrapper, container);

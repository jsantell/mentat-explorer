import 'babel-polyfill';
import 'whatwg-fetch'
import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './containers/app';
import muiTheme from './lib/material-theme';
import errorListener from './lib/error-listener';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// Currently the react-treeview-mui component explicitly uses this
// dependency to handle clicks
injectTapEventPlugin();

const store = createStore();

// Use errorListener to subscribe to new errors in state and subsequently
// fire an action to hide them after a few seconds
errorListener(store);

const wrapper = (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
);

const container = document.getElementById('container');
ReactDOM.render(wrapper, container);

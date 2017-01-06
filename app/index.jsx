import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './components/app';
import muiTheme from './lib/material-theme';

const store = createStore();

const wrapper = (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
);

const container = document.getElementById('container');
ReactDOM.render(wrapper, container);

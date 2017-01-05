import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './components/app';

const store = createStore();

const wrapper = (
  <Provider store={store}>
    <App />
  </Provider>
);

const container = document.getElementById('container');
ReactDOM.render(wrapper, container);

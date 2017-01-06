import React from 'react';
import { connect } from 'react-redux';
import Style from '../lib/style';
import * as actions from '../actions';
import HeaderView from './header';
import QueriesView from './queries';

const APP_STYLE = Style.registerStyle({
  width: '100%',
  height: '100%',
});

const App = function (props) {
  const Element = Style.Element;

  return (<div>
    <div className={`wrapper ${APP_STYLE}`}>
      <HeaderView />
      <QueriesView />
    </div>
    <Element />
  </div>);
};

App.displayName = 'App';
export default connect()(Style.component(App));

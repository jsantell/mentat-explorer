import React from 'react';
import { connect } from 'react-redux';
import Style from '../lib/style';
import * as actions from '../actions';

const APP_STYLE = Style.registerStyle({
  width: '100%',
  height: '100%',
});

const App = function (props) {
  const Element = Style.Element;

  return (<div>
    <h1>Hello!!!!</h1>
    <div className={`wrapper ${APP_STYLE}`}>
      {React.Children.toArray(props.children)}
    </div>
    <Element />
  </div>);
};

App.displayName = 'App';
export default connect()(Style.component(App));

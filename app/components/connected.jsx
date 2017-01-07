import React from 'react';
import { connect } from 'react-redux';
import Style from '../lib/style';
import QueryBuilderView from './query-builder';
import SchemaContainer from '../containers/schema';

const QUERIES_STYLE = Style.registerStyle({
  display: 'flex',
});

const ConnectedView = function (props) {
  return (<div className={`${QUERIES_STYLE}`}>
    <SchemaContainer />
    <QueryBuilderView />
  </div>);
};

ConnectedView.displayName = 'ConnectedView';
export default connect()(ConnectedView);

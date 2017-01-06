import React from 'react';
import { connect } from 'react-redux';
import Style from '../lib/style';
import QueryBuilderView from './query-builder';
import RecentQueries from './recent-queries';

const QUERIES_STYLE = Style.registerStyle({
  display: 'flex',
});

const QueriesView = function (props) {
  return (<div className={`${QUERIES_STYLE}`}>
    <RecentQueries />
    <QueryBuilderView />
  </div>);
};

QueriesView.displayName = 'QueriesView';
export default connect()(QueriesView);

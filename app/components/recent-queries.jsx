import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import Style from '../lib/style';

const RECENT_QUERIES_STYLE = Style.registerStyle({
  flex: 1,
});

const RecentQueriesView = function (props) {
  return <div className={`${RECENT_QUERIES_STYLE}`}>
    <Subheader>Recent Queries</Subheader>
    <List>
      <ListItem primaryText="Query 1" />
      <ListItem primaryText="Query 2" />
      <ListItem primaryText="Query 3" />
    </List>
  </div>;
};

RecentQueriesView.displayName = 'RecentQueriesView';
export default connect()(RecentQueriesView);

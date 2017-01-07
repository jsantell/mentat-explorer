import React from 'react';
import { connect } from 'react-redux';
import Style from '../lib/style';
import QueryBuilderView from './query-builder';
import SchemaContainer from '../containers/schema';
import Panel from './widgets/panel';

const QUERIES_STYLE = Style.registerStyle({
  display: 'flex',
});

const ConnectedView = function (props) {
  return (<div className={`${QUERIES_STYLE}`}>
    <Panel title={'Schema'} style={{ flex: 1 }}>
      <SchemaContainer />
    </Panel>
    <Panel title={'Query'} style={{ flex: 3 }}>
      <QueryBuilderView />
    </Panel>
  </div>);
};

ConnectedView.displayName = 'ConnectedView';
export default connect()(ConnectedView);

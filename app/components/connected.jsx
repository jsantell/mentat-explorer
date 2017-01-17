import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import Style from '../lib/style';
import QueryBuilderView from '../containers/query-builder';
import SchemaContainer from '../containers/schema';
import Panel from './widgets/panel';

const ConnectedView = function (props) {
  return <Grid style={{ margin: 0, width: '100%' }}>
    <Row>
    <Col xs={12} sm={12} md={3}>
      <Panel title={'Schema'} style={{ flex: 1 }}>
        <SchemaContainer />
      </Panel>
    </Col>
    <Col xs={12} sm={12} md={9}>
      <Panel title={'Query'} style={{ flex: 3 }}>
        <QueryBuilderView />
      </Panel>
    </Col>
    </Row>
  </Grid>;
};

ConnectedView.displayName = 'ConnectedView';
export default connect()(ConnectedView);

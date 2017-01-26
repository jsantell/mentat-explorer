import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import Style from '../lib/style';
import QueryBuilderView from '../containers/query-builder';
import SchemaContainer from '../containers/schema';
import Panel from './widgets/panel';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <Grid style={{ margin: 0, width: '100%' }}>
      <Row>
        <Col xs={12} sm={12} md={3}>
          <Panel title={'Schema'}>
            <SchemaContainer />
          </Panel>
        </Col>
        <Col xs={12} sm={12} md={9}>
          <Panel title={'Query'}>
            <QueryBuilderView />
          </Panel>
        </Col>
      </Row>
    </Grid>;
  }
};

MainView.displayName = 'MainView';
MainView.propTypes = {
};

export default MainView;

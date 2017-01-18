import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import Style from '../lib/style';
import { Tabs, Tab } from 'material-ui/Tabs';
import * as uiActions from '../actions/ui';
import QueryBuilderView from '../containers/query-builder';
import SchemaContainer from '../containers/schema';
import Panel from './widgets/panel';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleTabChange = (value) => {
    this.props.dispatch(uiActions.setCurrentView(value));
  }

  render() {
    const { currentView } = this.props;

    return <Grid style={{ margin: 0, width: '100%' }}>
      <Row>
        <Col xs={12} sm={12} md={3}>
          <Panel title={'Schema'}>
            <SchemaContainer />
          </Panel>
        </Col>
        <Col xs={12} sm={12} md={9}>
          <Tabs style={{ marginTop: '20px' }} onChange={this.handleTabChange} value={currentView}>
            <Tab label='Query' value='query'>
              <QueryBuilderView />
            </Tab>
            <Tab label='Entity' value='entity'>
              <div>entities</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Grid>;
  }
};

MainView.displayName = 'MainView';
MainView.propTypes = {
  currentView: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default MainView;

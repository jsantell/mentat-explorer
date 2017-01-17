import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Style from '../lib/style';
import { palette } from '../lib/material-theme';
import TextField from 'material-ui/TextField';
import Panel from './widgets/panel';
import Code from './widgets/code';
import * as actions from '../actions/ui';
import CONSTANTS from '../constants';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';

const LANDING_PAGE_STYLE = Style.registerStyle({
  width: '50%',
  margin: '0 auto',
});

const LandingPage = function (props) {
  const showCreateConnectionModal = () => props.dispatch(actions.showCreateConnectionModal());

  const panel = <Panel title={'Getting Started'}>
      <p>To start using <strong>Mentat Explorer</strong>, <a target={'_new'} href={CONSTANTS.MENTAT_WEB_SERVER_DOCUMENTATION} title='Mentat Web Server Documentation'>run the local server</a> on your Mentat database:</p>
      <Code>$ cargo run serve -p PORT -d path/to/mentat.db</Code>
      <p>Once the web server is running, connect to the same URL with Mentat Explorer</p>

      <p>You can also reload the page and append a <em>host</em> query parameter in the URL to autoconnect. Be sure to escape the host URL!</p>
      <Code>{`?host=http%3A//localhost%3A3${CONSTANTS.DEFAULT_HOST_PORT}`}</Code>

      <RaisedButton
        style={{ marginTop: '20px' }}
        label='Connect'
        primary={true}
        fullWidth={true}
        onClick={showCreateConnectionModal}
        />
    </Panel>;

  return (<Grid>
    <Row>
      <Col xs={2} md={3} />
      <Col xs={8} md={6}>
        {panel}
      </Col>
      <Col xs={2} md={3} />
    </Row>
  </Grid>);
};

LandingPage.displayName = 'LandingPage';
LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LandingPage);

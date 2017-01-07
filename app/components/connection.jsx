import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FlatButton from 'material-ui/FlatButton';
import SyncProblemIcon from 'material-ui/svg-icons/notification/sync-problem';
import SyncIcon from 'material-ui/svg-icons/notification/sync';
import Connection from '../models/connection';
import * as actions from '../actions/ui';
import Style from '../lib/style';

const CONNECTION_STYLE = Style.registerStyle({
  marginTop: '6px',
});

class ConnectionView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { dispatch, connection } = this.props;

    let el = null;

    const showCreateConnectionModal = () => dispatch(actions.showCreateConnectionModal());

    if (!connection) {
      el = <FlatButton
              onClick={showCreateConnectionModal}
              label={'Connect'}
              tooltip='Create Connection' />;
    } else {
      switch (connection.state) {
        case Connection.STATES.CONNECTED:
          el = <FlatButton
            onClick={showCreateConnectionModal}
            label={'Connected'}
            tooltip={`Connected to ${connection.name}@${connection.address}`} />;
          break;
        case Connection.STATES.CONNECTING:
          el = <FlatButton
            label={'Connecting...'}
            icon={<SyncIcon />}
            tooltip={`Connected to ${connection.name}@${connection.address}`} />;
          break;
        case Connection.STATES.DISCONNECTED:
          el = <FlatButton
            onClick={showCreateConnectionModal}
            label={'Disconnected'}
            icon={<SyncProblemIcon />}
            tooltip={`Not connected to ${connection.name}@${connection.address}`} />;
          break;
        default:
          throw new Error(`Unknown connection state: ${connection.state}`);
      }
    }

    return <div className={`${CONNECTION_STYLE}`}>{el}</div>;
  }
};

ConnectionView.displayName = 'ConnectionView';
ConnectionView.propTypes = {
  connection: PropTypes.object,
};

export default ConnectionView;

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import Connection from '../models/connection';
import * as actions from '../actions/ui';

class ConnectionView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { dispatch, connection } = this.props;

    let el = null;

    if (!connection) {
      el = <IconButton
              onClick={() => dispatch(actions.showCreateConnectionModal())}
              tooltip='Create Connection'>
             <AddIcon />
           </IconButton>;
    } else {
      switch (connection.state) {
        case Connection.STATES.CONNECTED:
          el = <span>{`Connected to ${connection.address}`}</span>;
          break;
        case Connection.STATES.CONNECTING:
          el = <span>{`Connecting to ${connection.address}`}</span>;
          break;
        case Connection.STATES.DISCONNECTED:
          el = <span>{`Disconnected from ${connection.address}`}</span>;
          break;
        default:
          throw new Error(`Unknown connection state: ${connection.state}`);
      }
    }

    return el;
  }
};

ConnectionView.displayName = 'ConnectionView';
ConnectionView.propTypes = {
  connection: PropTypes.object,
};

export default ConnectionView;

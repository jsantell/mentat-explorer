import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FlatButton from 'material-ui/FlatButton';
import SyncProblemIcon from 'material-ui/svg-icons/notification/sync-problem';
import SyncIcon from 'material-ui/svg-icons/notification/sync';
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
    const { dispatch, address } = this.props;

    let el = null;

    const showCreateConnectionModal = () => dispatch(actions.showCreateConnectionModal());

    if (!address) {
      el = <FlatButton
              onClick={showCreateConnectionModal}
              label={'Connect'}
              tooltip='Create Connection' />;
    } else {
      el = <FlatButton
        onClick={showCreateConnectionModal}
        label={'Connected'}
        tooltip={`Connected to ${address}`} />
    }

    return <div className={`${CONNECTION_STYLE}`}>{el}</div>;
  }
};

ConnectionView.displayName = 'ConnectionView';
ConnectionView.propTypes = {
  address: PropTypes.string,
};

export default ConnectionView;

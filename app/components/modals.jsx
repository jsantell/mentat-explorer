import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as actions from '../actions/ui';
import CreateConnectionModal from './modals/create-connection';

class ModalsView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { showCreateConnectionModal, dispatch } = this.props;

    let modal = null;

    if (showCreateConnectionModal) {
      modal = <CreateConnectionModal dispatch={dispatch} />;
    }

    return modal;
  }
};

ModalsView.displayName = 'ModalsView';
ModalsView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showCreateConnectionModal: PropTypes.bool.isRequired,
};

export default ModalsView;

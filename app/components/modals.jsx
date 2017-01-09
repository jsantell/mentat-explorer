import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Snackbar from 'material-ui/Snackbar';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import * as actions from '../actions/ui';
import CreateConnectionModal from './modals/create-connection';
import { palette } from '../lib/material-theme';

const ERROR_CONTENT_STYLE = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const ERROR_BODY_STYLE = {
  backgroundColor: palette.canvasColor,
  border: 'rgba(0, 0, 0, 0.3) 1px solid',
};

class ModalsView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { error, showCreateConnectionModal, dispatch } = this.props;

    let modalEl = null;
    let errorEl = null;

    if (showCreateConnectionModal) {
      modalEl = <CreateConnectionModal dispatch={dispatch} />;
    }

    if (error) {
      const errorContent = <span>
        <ErrorIcon color={palette.errorColor} style={{ float: 'left', margin: '10 10 0 0' }} />
        <span>{error.error}</span>
      </span>;

      errorEl = <Snackbar
        bodyStyle={ERROR_BODY_STYLE}
        contentStyle={ERROR_CONTENT_STYLE}
        open={true}
        message={errorContent}
        />
    }

    return <div>{modalEl}{errorEl}</div>;
  }
};

ModalsView.displayName = 'ModalsView';
ModalsView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showCreateConnectionModal: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export default ModalsView;

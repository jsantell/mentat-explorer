import React, { PropTypes, Component } from 'react';
import Style from '../../lib/style';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import * as actions from '../../actions/connection';
import * as UIActions from '../../actions/ui';

// Cannot use a class as material-ui overrides its own styles
const INPUT_STYLE = {
  width: '100%',
};

class CreateConnectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsubmitted: true,
      errors: {},
    };
  }

  validate() {
    const name = this.name.input.value;
    const address = this.address.input.value;
    const errors = {};

    if (!name || name.length < 1) {
      errors.name = 'Must provide a name for this connection.';
    }

    if (!address || address.length < 1) {
      errors.address = 'Must provide an address for this connection.';
    } else if (!/https?:\/\//.test(address)) {
      errors.address = 'Must be a valid address.';
    }

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  }

  onClose() {
    this.props.dispatch(UIActions.hideCreateConnectionModal());
  }

  onChange() {
    // Only validate on change after first submission attempt
    if (!this.state.unsubmitted) {
      this.validate();
    }
  }

  onConnect() {
    const valid = this.validate();
    this.setState({ unsubmitted: false });

    if (valid) {
      const name = this.name.input.value;
      const address = this.address.input.value;

      if (this.dummy.state.switched) {
        console.warn('USING DUMMY CONNECTION!');
        this.props.dispatch(actions.connectDummy(name, address));
      } else {
        this.props.dispatch(actions.connect(name, address));
      }
      this.onClose();
    }
  }

  render() {
    const { dispatch } = this.props;

    const actions = [
      <FlatButton
        label='Cancel'
        primary={false}
        onClick={() => this.onClose()}
      />,
      <FlatButton
        label='Connect'
        primary={true}
        onClick={() => this.onConnect()}
      />,
    ];

    return (
      <Dialog
        open={true}
        title={'New Connection'}
        actions={actions}>

        <form onChange={() => this.onChange()}
          onSubmit={e => console.log('submit', e)}>
          <TextField
            ref={e => this.name = e}
            style={INPUT_STYLE}
            floatingLabelText='Connection Name'
            errorText={this.state.errors.name}
            />
          <br />
          <TextField
            ref={e => this.address = e}
            style={INPUT_STYLE}
            hintText='http://localhost:3030'
            floatingLabelText='Address'
            errorText={this.state.errors.address}
            />
          <br />
          <Toggle ref={e => this.dummy = e }
            label='Use Dummy Connection' labelPosition='right' />
        </form>
      </Dialog>
    );
  }
};

CreateConnectionModal.displayName = 'CreateConnectionModal';
CreateConnectionModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default CreateConnectionModal;

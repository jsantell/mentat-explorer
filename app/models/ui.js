import Immutable from 'immutable';

const UI = Immutable.Record({
  showCreateConnectionModal: false,
  errors: Immutable.List(),
}, 'UI');

export default UI;

import Immutable from 'immutable';

const UI = Immutable.Record({
  showCreateConnectionModal: false,
  errors: Immutable.List(),
  currentView: 'query',
}, 'UI');

export default UI;

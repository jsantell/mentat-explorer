import { connect } from 'react-redux';
import * as selectors from '../selectors';
import ModalsView from '../components/modals';

const mapStateToProps = state => {
  const showCreateConnectionModal = selectors.showCreateConnectionModal(state);
  let error = selectors.getMostRecentError(state);

  if (error && error.get('display') === false) {
    error = null;
  }

  return {
    showCreateConnectionModal,
    error,
  }
};

export default connect(mapStateToProps)(ModalsView);

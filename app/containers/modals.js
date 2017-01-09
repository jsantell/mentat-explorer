import { connect } from 'react-redux';
import * as selectors from '../selectors';
import ModalsView from '../components/modals';

const mapStateToProps = state => {
  const showCreateConnectionModal = selectors.showCreateConnectionModal(state);
  const error = selectors.getMostRecentError(state);
  return {
    showCreateConnectionModal,
    error,
  }
};

export default connect(mapStateToProps)(ModalsView);

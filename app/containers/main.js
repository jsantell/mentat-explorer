import { connect } from 'react-redux';
import * as selectors from '../selectors';
import MainView from '../components/main';

const mapStateToProps = state => {
  const currentView = selectors.getCurrentView(state);
  return {
    currentView,
  }
};

export default connect(mapStateToProps)(MainView);

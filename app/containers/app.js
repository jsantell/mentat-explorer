import { connect } from 'react-redux';
import * as selectors from '../selectors';
import AppView from '../components/app';

const mapStateToProps = state => {
  const hasConnection = !!selectors.getConnection(state);
  return {
    hasConnection,
  }
};

export default connect(mapStateToProps)(AppView);

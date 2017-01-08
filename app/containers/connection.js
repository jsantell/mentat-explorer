import { connect } from 'react-redux';
import * as selectors from '../selectors';
import ConnectionView from '../components/connection';

const mapStateToProps = state => {
  const address = selectors.getConnectionAddress(state);
  return {
    address,
  }
};

export default connect(mapStateToProps)(ConnectionView);

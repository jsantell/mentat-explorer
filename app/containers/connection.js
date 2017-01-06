import { connect } from 'react-redux';
import * as selectors from '../selectors';
import ConnectionView from '../components/connection';

const mapStateToProps = state => {
  const connection = selectors.getConnection(state);
  return {
    connection,
  }
};

export default connect(mapStateToProps)(ConnectionView);

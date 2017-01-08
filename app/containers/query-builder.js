import { connect } from 'react-redux';
import * as selectors from '../selectors';
import QueryBuilderView from '../components/query-builder';

const mapStateToProps = state => {
  const query = selectors.getMostRecentQuery(state);

  return {
    query,
  }
};

export default connect(mapStateToProps)(QueryBuilderView);

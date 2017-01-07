import { connect } from 'react-redux';
import * as selectors from '../selectors';
import SchemaView from '../components/schema';

const mapStateToProps = state => {
  const schema = selectors.getSchema(state);
  return {
    schema,
  }
};

export default connect(mapStateToProps)(SchemaView);

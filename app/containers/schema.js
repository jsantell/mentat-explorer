import { connect } from 'react-redux';
import * as selectors from '../selectors';
import SchemaView from '../components/schema';

const mapStateToProps = state => {
  const data = selectors.getSchemaData(state);
  const schemaState = selectors.getSchemaState(state);

  console.log(data, schemaState);
  return {
    data,
    state: schemaState,
  }
};

export default connect(mapStateToProps)(SchemaView);

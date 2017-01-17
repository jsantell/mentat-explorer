import React, { PropTypes } from 'react';
import Tree from './widgets/MuiTreeList';
import Style from '../lib/style';
import Schema from '../models/schema';
import * as actions from '../actions/connection';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const SCHEMA_STYLE = Style.registerStyle({
  position: 'relative',
  minHeight: '400px',
});

function createTreeData (obj, array, parentIndex) {
  if (!array) {
    array = [{
      depth: 0,
      children: [],
    }];
    parentIndex = 0;
  }

  const parent = array[parentIndex];

  Object.keys(obj).forEach(prop => {
    const value = obj[prop];
    const isLeaf = typeof value !== 'object';
    const children = isLeaf ? null : [];
    const thisIndex = array.length;
    const displayValue = isLeaf ? `${prop}: ${value}` : prop;

    array.push({
      depth: parent.depth + 1,
      value: displayValue,
      children: children,
      parentIndex: parentIndex,
    });

    parent.children.push(thisIndex);

    if (!isLeaf) {
      createTreeData(value, array, thisIndex);
    }
  });

  return array;
}

const SchemaView = function (props) {
  const { dispatch, state, data } = props;
  let tree = null;
  let refresh = null;
  let message = null;
  let refreshProps = {
    style: {
      margin: '0 auto',
      position: 'relative',
    },
  };

  if (data && state !== Schema.STATES.LOADED) {
    throw new Error('Should not have schema data without it being in a LOADED state.');
  }

  if (data) {
    tree = <Tree haveSearchbar={true} contentKey={'value'} listItems={createTreeData(data)} />
  }

  if (state === Schema.STATES.LOADING) {
    refreshProps.status = 'loading';
  } else if (state === Schema.STATES.FAILED) {
    refreshProps.status = 'ready';
    refreshProps.percentage = 100;
    refreshProps.onClick = () => dispatch(actions.fetchSchema());
    refreshProps.style.cursor = 'pointer';
    message = <div style={{ margin: '10px 0px' }}>Could not fetch schema.</div>
  } else {
    refreshProps.status = 'hide';
  }

  if (refreshProps.status !== 'hide') {
    refresh = <RefreshIndicator
      size={40}
      top={0}
      left={0}
      {...refreshProps}
    />;
  }

  return <div className={`${SCHEMA_STYLE}`}>
    {refresh}
    {message}
    {tree}
  </div>
};

SchemaView.displayName = 'SchemaView';
SchemaView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export default SchemaView;

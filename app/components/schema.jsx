import React, { PropTypes } from 'react';
import Tree from './widgets/MuiTreeList';
import Style from '../lib/style';

const SCHEMA_STYLE = Style.registerStyle({
  flex: 1,
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
  const schema = props.schema;
  let tree = null;

  if (!schema) {
    tree = <div>{'No schema found.'}</div>
  } else {
    tree = <Tree haveSearchbar={true} contentKey={'value'} listItems={createTreeData(schema)} />
  }

  return <div className={`${SCHEMA_STYLE}`}>
    {tree}
  </div>
};

SchemaView.displayName = 'SchemaView';
SchemaView.propTypes = {
  schema: PropTypes.object,
};

export default SchemaView;

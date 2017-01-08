import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Style from '../lib/style';
import EditorView from './editor';

const QUERY_BUILDER_STYLE = Style.registerStyle({
  flex: 2,
});

const QueryBuilderView = function (props) {
  return <div className={`${QUERY_BUILDER_STYLE}`}>
    <div>
      <EditorView />
      <Toolbar>
        <ToolbarSeparator style={{ visibility: 'hidden' }}/>
        <ToolbarGroup>
          <RaisedButton label='Execute' primary={true} />
        </ToolbarGroup>
      </Toolbar>
    </div>
  </div>;
};

QueryBuilderView.displayName = 'QueryBuilderView';
export default connect()(QueryBuilderView);

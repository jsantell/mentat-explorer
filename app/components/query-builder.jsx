import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/queries';
import Style from '../lib/style';
import EditorView from './widgets/editor';
import QueryResults from './query-results';

const QUERY_BUILDER_STYLE = Style.registerStyle({
  flex: 2,
});

class QueryBuilderView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  executeQuery() {
    this.props.dispatch(actions.query(this.editor.getQuery()));
  }

  render() {
    const props = this.props;

    return <div className={`${QUERY_BUILDER_STYLE}`}>
      <div>
        <EditorView ref={e => this.editor = e} />
        <Toolbar>
          <ToolbarSeparator style={{ visibility: 'hidden' }}/>
          <ToolbarGroup>
            <RaisedButton onClick={() => this.executeQuery()} label='Execute' primary={true} />
          </ToolbarGroup>
        </Toolbar>
      </div>
      <div>
        <QueryResults query={props.query} />
      </div>
    </div>;
  }
};

QueryBuilderView.displayName = 'QueryBuilderView';
QueryBuilderView.propTypes = {
  query: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default QueryBuilderView;

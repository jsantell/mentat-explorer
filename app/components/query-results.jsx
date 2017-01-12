import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import Query from '../models/query';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';


class QueryResultsView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { src, results, state } = this.props.query || {};

    let arity = null;

    const rows = results ? results.map((datum, i) => {
      arity = datum.length;
      return <TableRow key={i}>
        {datum.map(d => <TableRowColumn>{d}</TableRowColumn>)}
      </TableRow>;
    }) : null;

    const table = results ? (<Table>
      <TableHeader>
        <TableRow>
          {new Array(arity).fill(1).map((_, i) => <TableHeaderColumn key={i}>C</TableHeaderColumn>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows}
      </TableBody>
    </Table>) : null;

    return !state ? (<div>No query</div>) :
           state === Query.STATES.LOADING ? (<div>Loading</div>) :
           state === Query.STATES.FAILED ? (<div>Failed</div>) : table;
  }
};

QueryResultsView.displayName = 'QueryResultsView';
QueryResultsView.propTypes = {
  query: PropTypes.object,
};

export default connect()(QueryResultsView);

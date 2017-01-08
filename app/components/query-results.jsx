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

    const rows = results ? results.map((datum, i) => {
      return <TableRow key={i}>
        <TableRowColumn>{datum.e}</TableRowColumn>
        <TableRowColumn>{datum.a}</TableRowColumn>
        <TableRowColumn>{datum.v}</TableRowColumn>
        <TableRowColumn>{datum.t}</TableRowColumn>
      </TableRow>;
    }) : null;

    const table = results ? (<Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>E</TableHeaderColumn>
          <TableHeaderColumn>A</TableHeaderColumn>
          <TableHeaderColumn>V</TableHeaderColumn>
          <TableHeaderColumn>T</TableHeaderColumn>
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

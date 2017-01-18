import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Style from '../lib/style';
import { palette } from '../lib/material-theme';
import { connect } from 'react-redux';
import Query from '../models/query';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

const ROW_HEIGHT = '30px';

const RESULTS_STYLE = Style.registerStyle({
  position: 'relative',
  minHeight: '300px',
});

/**
 * Hacky regex parsing to get the :find params
 * out of the query to display in the columns.
 *
 * TODO Should we get these values from the server
 * or have some sort of client EDN parser?
 */
const getColumnNames = (querySrc) => {
  if (!querySrc) {
    return [];
  }
  const match = querySrc.match(/\:find ((?:\?[a-zA-Z] *)+)/)
  if (match.length > 1) {
    return match[1].split(' ').filter(Boolean);
  }
  return [];
};

class QueryResultsView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { src, results, state } = this.props.query || {};

    let arity = null;

    const columnNames = getColumnNames(src);

    const rows = results ? results.map((datum, i) => {
      arity = datum.length;
      return <TableRow key={i} style={{ height: ROW_HEIGHT }}>
        {datum.map(d => <TableRowColumn style={{ height: ROW_HEIGHT }}>{d}</TableRowColumn>)}
      </TableRow>;
    }) : null;

    const table = results ? (<Table className='results-table' selectable={false}>
      <TableHeader>
        <TableRow style={{ height: ROW_HEIGHT, backgroundColor: palette.primary1Color }}>
          {new Array(arity).fill(1).map((_, i) =>
            <TableHeaderColumn style={{ height: ROW_HEIGHT }} key={i}>
              {columnNames[i] || '?'}
            </TableHeaderColumn>)}
        </TableRow>
      </TableHeader>
      <TableBody stripedRows={true} showRowHover={true}>
        {rows}
      </TableBody>
    </Table>) : null;

    const loading = state === Query.STATES.LOADING ?
      <RefreshIndicator size={40}
        top={0}
        left={0}
        status='loading'
        style={{ margin: '20px auto', position: 'relative' }}
        /> : null;

    const message = state === Query.STATES.FAILED ?
      <div style={{ margin: '10px 0px' }}>Query failed.</div> : null;

    return <div className={`${RESULTS_STYLE}`}>
      {loading}
      {message}
      {table}
    </div>;
  }
};

QueryResultsView.displayName = 'QueryResultsView';
QueryResultsView.propTypes = {
  query: PropTypes.object,
};

export default connect()(QueryResultsView);

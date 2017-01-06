import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';

const HeaderView = function (props) {
  return (<AppBar title="Datomish Explorer" />);
};

HeaderView.displayName = 'HeaderView';
export default connect()(HeaderView);

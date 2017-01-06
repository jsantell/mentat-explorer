import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';

const HeaderView = function (props) {
  return (<AppBar
    title='Datomish Explorer'
    titleStyle={{
      color: 'white',
      fontSize: '20px',
      textTransform: 'uppercase',
      fontWeight: '300',
    }}
  />);
};

HeaderView.displayName = 'HeaderView';
export default connect()(HeaderView);

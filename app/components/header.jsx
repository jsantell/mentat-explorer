import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AppBar from 'material-ui/AppBar';
import ConnectionContainer from '../containers/connection';

class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (<AppBar
      title='Datomish Explorer'
      titleStyle={{
        color: 'white',
        fontSize: '20px',
        textTransform: 'uppercase',
        fontWeight: '300',
      }}
      iconElementRight={<ConnectionContainer />}
    />);
  }
};

HeaderView.displayName = 'HeaderView';
HeaderView.propTypes = {
};

export default HeaderView;

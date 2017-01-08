import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Style from '../lib/style';
import HeaderView from './header';
import ModalsContainer from '../containers/modals';
import ConnectedView from './connected';
import LandingPageView from './landing-page';

const APP_STYLE = Style.registerStyle({
  width: '100%',
  height: '100%',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const Element = Style.Element;

    const content = [];
    content.push(<HeaderView key='header' />);

    if (this.props.hasConnection) {
      content.push(<ConnectedView key='connected' />);
    } else {
      content.push(<LandingPageView key='landing' />);
    }

    return (<div>
      <div className={`wrapper ${APP_STYLE}`}>
        {content}
      </div>
      <ModalsContainer />
      <Element />
    </div>);
  }
};

App.displayName = 'App';
App.propTypes = {
  hasConnection: PropTypes.bool.isRequired,
};

export default Style.component(App);

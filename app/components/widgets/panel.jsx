import React, { PropTypes, createClass } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import Style from '../../lib/style';
import { palette } from '../../lib/material-theme';

const PAPER_STYLE = {
  marginTop: '20px',
  border: 'none',
};

const TITLE_STYLE = Style.registerStyle({
  fontSize: '100%',
  top: 0,
  left: '30px',
  padding: '10px 20px',
  backgroundColor: palette.primary2Color,
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: '300',
});

const ACTION_BUTTON_STYLE = Style.registerStyle({
  zIndex: 1000,
  marginRight: '10px',
  marginTop: '-24px',
  height: '40px',
  textAlign: 'right',
  position: 'absolute',
  right: '20px',
});

const PANEL_CONTENTS_STYLE = Style.registerStyle({
  padding: '20px',
});

const Panel = createClass({
  mixins: [PureRenderMixin],

  render() {
    const {
      style, title, actionButton, titleStyle, titleIcon, ...otherProps
    } = this.props;
    const paperStyle = Object.assign({}, PAPER_STYLE, style);

    const titleContainer = this.props.title ? 
      <div className={TITLE_STYLE} style={this.props.titleStyle}>
        <div style={{ position: 'absolute'}}>{this.props.titleIcon}</div>
        <div style={{ marginLeft: (this.props.titleIcon ? '30px' : '0px') }}>{this.props.title}</div>
      </div> :
      null;

    return (<Paper className={'panel'} {...otherProps} style={paperStyle}>
      {titleContainer}
      <div className={ACTION_BUTTON_STYLE}>{this.props.actionButton}</div>
      <div className={PANEL_CONTENTS_STYLE}>{this.props.children}</div>
    </Paper>);
  },
});

Panel.displayName = 'Panel';
Panel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.node,
  actionButton: PropTypes.node,
  titleStyle: PropTypes.object,
  titleIcon: PropTypes.node,
};

export default Panel;

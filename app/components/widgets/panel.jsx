import React, { PropTypes, createClass } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import Style from '../../lib/style';
import { palette } from '../../lib/material-theme';

const PAPER_STYLE = {
  marginTop: '20px',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.5)',
  overflow: 'hidden',
};

const TITLE_STYLE = Style.registerStyle({
  fontSize: '16px',
  top: 0,
  left: '30px',
  padding: '20px',
  textTransform: 'uppercase',
  fontWeight: 300,
  backgroundColor: palette.primary1Color,
  color: 'white',
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
      style,
      title,
      actionButton,
      titleStyle,
      titleIcon,
      children,
      ...otherProps,
    } = this.props;

    const appliedStyle = {
      ...PAPER_STYLE,
      ...style,
    };

    const titleContainer = title ? 
      <div className={TITLE_STYLE} style={titleStyle}>
        <div style={{ position: 'absolute'}}>{titleIcon}</div>
        <div style={{ marginLeft: (titleIcon ? '30px' : '0px') }}>{title}</div>
      </div> :
      null;

    return (<Paper className={'panel'} {...otherProps} style={appliedStyle}>
      {titleContainer}
      <div className={ACTION_BUTTON_STYLE}>{actionButton}</div>
      <div className={PANEL_CONTENTS_STYLE}>{children}</div>
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

import React, { PropTypes, createClass } from 'react';
import Style from '../../lib/style';
import { palette } from '../../lib/material-theme';

const CODE_STYLE = Style.registerStyle({
  display: 'block',
  backgroundColor: palette.backgroundColor,
  padding: '10px',
});

const Code = props => {
  return <code className={CODE_STYLE} {...props}>
    {props.children}
  </code>;
};

Code.displayName = 'Code';
Code.propTypes = {};

export default Code;

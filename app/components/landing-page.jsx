import React from 'react';
import { connect } from 'react-redux';
import Style from '../lib/style';
import { palette } from '../lib/material-theme';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const LANDING_PAGE_STYLE = Style.registerStyle({
  width: '50%',
  margin: '0 auto',
});

const LandingPage = function (props) {
  return (<div className={`${LANDING_PAGE_STYLE}`}>
    <Paper>
      <TextField
        underlineFocusStyle={{ borderColor: palette.accent1Color }}
        hintText='localhost:3000' />
    </Paper>
    <Paper>
      <p>hello!</p>
    </Paper>
  </div>);
};

LandingPage.displayName = 'LandingPage';
export default connect()(LandingPage);

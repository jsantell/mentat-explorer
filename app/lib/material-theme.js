import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import {
  teal500, teal700,
  grey600,
  pinkA100, pinkA200, pinkA400,
  fullWhite,
} from 'material-ui/styles/colors';

export const palette = {
  primary1Color: teal700,
  primary2Color: teal500,
  primary3Color: grey600,
  accent1Color: '#e3b93c',
  accent2Color: '#263238',
  accent3Color: '#e3b93c',
  textColor: fullWhite,
  secondaryTextColor: '#8f9fa6',
  alternateTextColor: fade(fullWhite, 0.7),
  canvasColor: '#263238',
  borderColor: fade(fullWhite, 0.3),
  disabledColor: '#4b585d',
  pickerHeaderColor: fade(fullWhite, 0.12),
  clockCircleColor: fade(fullWhite, 0.12),

  // Custom palettes not used by MuiThemeProvider
  errorColor: '#c16d7e',
  backgroundColor: '#222d32',
};

export default getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette,
});

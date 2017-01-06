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

export default getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: grey600,
    accent1Color: '#e3b93c',
    accent2Color: '#263238',
    accent3Color: '#e3b93c',
    textColor: '#8f9fa6',
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
});

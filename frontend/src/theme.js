import { createTheme,responsiveFontSizes } from '@material-ui/core/styles';
// import { pink } from '@material-ui/core/colors';

// let theme = createMuiTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       main: "#ffffff",
//       contrastText: "#000000",
      
//     },
//     secondary: {
//       // This is green.A700 as hex.
//       main: '#000000',
//       contrastText: "#ffffff",
//     },
//   },
// });

let theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
    light: '#ffffff',
    main: '#6C63FF',
    dark: '#000000',
    contrastText: '#000',
  },
  secondary: {
    light: '#ff79b0',
    main: '#ff4081',
    dark: '#c60055',
    contrastText: '#000',
    succes: '#B4D4A55',
  },
  // danger: {

  // },
  // info: {

  // },
    openTitle: "#000000",
    protectedTitle: "#2979FF",
    type: 'light'
  }
})
theme=responsiveFontSizes(theme);
// import { red } from '@material-ui/core/colors';
// import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
// let theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: '#fff',
//     },
//   },
// });

theme = responsiveFontSizes(theme);
export default theme;
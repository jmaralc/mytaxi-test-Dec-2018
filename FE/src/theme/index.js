import { createMuiTheme } from '@material-ui/core/styles';

const HkTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
          main: '#FDC300',
        },
        secondary: {
          main: '#00a0e1',
        },
      },
    overrides: {
        MuiButton: { // Name of the component ⚛️ / style sheet
            root: { // Name of the rule
                color: '#D7CCC8', // Some CSS
            },
        },
    }
});

export default HkTheme
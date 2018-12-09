import { createMuiTheme } from '@material-ui/core/styles';

const MyTheme = createMuiTheme({
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
    }
});

export default MyTheme
import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    neural: {
      1: '#FFFFFF',
      2: '#E6E6E6',
      22: '#F5F5F5',
      3: '#CCCCCC',
      4: '#666666',
      5: '#999999',
      6: '#808080',
      7: '#666666',
      8: '#4D4D4D',
      9: '#333333',
      10: '#1A1A1A',
      11: '#FFE69A',
    },
    primary: {
      11: '#3D9BE0',
      12: '#31BAFA',
      13: '#84D6FC',
      14: '#EBF8FE',
      21: '#216BCD',
      22: '#2883E3',
      23: '#459FF4',
      24: '#90C6F9',
      31: '#0E3C9E',
      32: '#1E4DB4',
      33: '#6C82C9',
      34: '#E6E9F6',
    },
    secondary: {
      1: '#AF5300',
      2: '#D4A418',
    },
    popup: {
      success: '#28A745',
      warning: '#FFC107',
      error: '#DC3545',
    },

    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
      500: '#5AC8FA1A',
    },
    text: {
      100: '#161719',
      200: '#000000',
      300: '#181818',
      400: '#888888',
      500: '#216BCD',
      600: '#3D9BE0',
      700: '#FDFDFD',
      800: '#FFFFFF',
      900: '#F4F4F4',
      1000: '#D70000',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});

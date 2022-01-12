import { extendTheme, ThemeConfig, ThemeOverride } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const override: ThemeOverride = {
  fonts: {
    body: 'Lato, sans-serif',
    heading: 'Roboto, sans-serif',
  },
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: {
          bg: '#3d3d3d',
        },
      }),
    },
    Select: {
      baseStyle: () => ({
        '> option': {
          bg: '#3d3d3d',
        },
      }),
    },
  },
  colors: {
    gray: {
      50: '#f2f2f3',
      100: '#d7d7d7',
      200: '#bdbdbd',
      300: '#a2a2a2',
      400: '#878789',
      500: '#6e6e70',
      600: '#565656',
      700: '#3d3d3d',
      800: '#242424',
      900: '#0c0c0d',
    },
  },
  config,
};

const theme = extendTheme(override);

export default theme;

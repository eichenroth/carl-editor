const colors = require('tailwindcss/colors');

const tailwindColors = {
  'blue-gray': colors.blueGray,
  'cool-gray': colors.coolGray,
  gray: colors.gray,
  'true-gray': colors.trueGray,
  'warm-gray': colors.warmGray,
  red: colors.red,
  orange: colors.orange,
  amber: colors.amber,
  yellow: colors.yellow,
  lime: colors.lime,
  green: colors.green,
  emerald: colors.emerald,
  teal: colors.teal,
  cyan: colors.cyan,
  sky: colors.sky,
  blue: colors.blue,
  indigo: colors.indigo,
  violet: colors.violet,
  purple: colors.purple,
  fuchsia: colors.fuchsia,
  pink: colors.pink,
  rose: colors.rose,
};

module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
      },
      transitionProperty: { width: 'width' },
      fontFamily: {
        sans: [
          'Roboto',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus', 'hover'],
      display: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [],
  important: true,
};

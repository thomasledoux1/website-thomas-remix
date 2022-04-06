// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: '#F5EBFF',
        primary: 'var(--primary)',
        lightgrey: '#393e46',
        linkedIn: '#0076b5',
        darkgrey: 'var(--darkgray)',
        text: 'var(--text)',
        orange: '#b55400',
        yellow: 'var(--yellow)',
        blue: 'var(--blue)',
        secondary: 'var(--secondary)',
        lightpurple: 'var(--lightpurple)',
      },
      inset: {
        timelineCircle: 'calc(50% - 0.5em)',
      },
      boxShadow: {
        case: '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)',
        'case-hover': '0 10px 28px rgba(0,0,0,.25), 0 8px 10px rgba(0,0,0,.22)',
      },
      keyframes: {
        'title-part1': {
          '0%, 100%': {color: 'var(--text)'},
          '50%': {color: 'var(--primary)'},
        },
        'title-part2': {
          '0%, 100%': {color: 'var(--text)'},
          '50%': {color: 'var(--yellow)'},
        },
        'title-part3': {
          '0%, 100%': {color: 'var(--text)'},
          '50%': {color: 'var(--blue)'},
        },
      },
      animation: {
        'title-part1': 'title-part1 3s ease-in-out infinite',
        'title-part2': 'title-part2 3s ease-in-out 1s infinite',
        'title-part3': 'title-part3 3s ease-in-out 2s infinite',
      },
      rotate: {
        135: '135deg',
        '-135': '-135deg',
      },
      zIndex: {
        '-1': '-1',
      },
      fontFamily: {
        heading: ['Montserrat', ...defaultTheme.fontFamily.sans],
        body: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}

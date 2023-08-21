const breadTheme = require('./tailwind.theme.cjs');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      ...breadTheme,
    },
  },
  /* eslint-disable-next-line */
  plugins: [require('@tailwindcss/typography')],
};

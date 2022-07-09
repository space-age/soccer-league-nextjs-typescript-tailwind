module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: { custombp: { raw: '(max-height: 550px)' } },
    },
  },
  plugins: [],
}

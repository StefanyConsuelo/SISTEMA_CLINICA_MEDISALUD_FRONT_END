module.exports = {
  important: true, 
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  purge: {
    content: [
    './src/**/*.html',
    './src/**/*.scss'
    ]
  }
}

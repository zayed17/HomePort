/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        BlueGray: '#1e293b',
        GrayishBlue: '#616975',
        DarkBlue:'#0d0c1d'
      },
    },
  },
  plugins: [],
}
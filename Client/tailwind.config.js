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
        // LightdarkBlue: '#474973',
        LightdarkBlue: '#1e293b',
        lightViolet: '#a69cac',
        DarkBlue:'#0d0c1d'
      },
    },
  },
  plugins: [],
}
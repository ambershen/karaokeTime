/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF6EC7',
        'neon-blue': '#00F5FF',
        'neon-purple': '#9D72FF',
        'neon-green': '#00FF9F',
        'dark-purple': '#2D1B4E',
      },
      fontFamily: {
        'vaporwave': ['VT323', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.neon-pink"), 0 0 20px theme("colors.neon-blue")',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
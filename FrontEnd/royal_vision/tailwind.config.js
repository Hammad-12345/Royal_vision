/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust if your project is structured differently
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins:'Poppins',
      },
      colors: {
        pink: '#5f304d',
      },
      animation: {
        'loading-line': 'loadingLine 2s linear infinite',
      },
      keyframes: {
        loadingLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

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
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '1100': '1100px',
        '1440': '1440px',
        '1600': '1600px',
      },
      spacing: {
        '5vw': '5vw',
        '90vw': '90vw',
        '10.5': '2.625rem',
        'page-x': '5vw',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#662671',
        'secondary': "#0D0842",
        "BG-color": "#F3F3F3",
        'favorite': '#FF5841'
      },
      fontFamily: {
        'primary': ["Roboto", "serif"],
        'secondary': ["Nunito Sans", "sans-serif"],
      },
      screens: {
        'xs': '375px',
        'sm-plus': '425px',
      },
    },
  },
  plugins: [],
}

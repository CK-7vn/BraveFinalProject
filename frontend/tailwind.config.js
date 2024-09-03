/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      "corporate",
      "business",
    ]
  },

  plugins: [
    require('daisyui'),
    require('autoprefixer'),
    require("theme-change"),
  ],
}


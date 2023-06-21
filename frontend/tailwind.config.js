const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        // Collectible colors
        "collectible-dark-purple": "#201F23",
        "collectible-medium-purple": "#26252C",
        "collectible-purple": "#7A5FC8",
        "gray-strong": "#F5F5F5",
        "gray-medium": "rgba(245, 245, 245, 0.5)",
        "gray-weak": "rgba(245, 245, 245, 0.2)",
      },
    },
  },
  plugins: [],
};

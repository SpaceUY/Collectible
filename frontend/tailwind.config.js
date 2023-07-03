const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  purge: {
    options: {
      safelist: [
        "from-red-500",
        "from-green-500",
        "from-blue-500",
        "from-white",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
        "to-collectible-dark-purple",
        "from-[#000000]",
      ],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        // Collectible colors
        "collectible-dark-purple": "#201F23",
        "collectible-medium-purple": "#26252C",
        "collectible-purple": "#7A5FC8", // Main color, used in: buttons, ...
        "collectible-purple-borders": "#433273",
        "collectible-blue": "#1d4ed8",
        "gray-strong": "#F5F5F5",
        "gray-medium": "rgba(245, 245, 245, 0.5)",
        "gray-weak": "rgba(245, 245, 245, 0.2)",
      },
    },
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};

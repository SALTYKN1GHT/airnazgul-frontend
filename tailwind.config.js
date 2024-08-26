const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{html,ts}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color, rgba(0, 0, 0, 0.5))",
        DEFAULT: "0 2px 4px var(--tw-shadow-color, rgba(0, 0, 0, 0.5))",
        lg: "0 8px 16px var(--tw-shadow-color, rgba(0, 0, 0, 0.5))",
      },
      boxShadow: {
        soft: "-3px 3px 4px rgba(0, 0, 0, 0.25)",
        soft_lighter: "-3px 3px 4px rgba(0, 0, 0, 0.15)",
        sharp: "0px 3px 1px rgba(0, 0, 0, 0.25)",
      },
      colors: { primary: "#2e7b4e" },
    },
    fontFamily: {
      outfit: ['"Outfit"', "sans-serif"],
      roboto: ['"Roboto"', "sans-serif"],
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};

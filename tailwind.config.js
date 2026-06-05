const colors = require("tailwindcss/colors");
const { colorTokens } = require("./src/theme/colors");
const { typographyTokens } = require("./src/theme/typography");
const { spacingTokens } = require("./src/theme/spacing");
const { radiusTokens } = require("./src/theme/radius");
const { shadowTokens } = require("./src/theme/shadows");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        secondary: colors.blue,
        ...colorTokens,
      },
      fontFamily: typographyTokens.fontFamily,
      fontSize: typographyTokens.fontSize,
      spacing: spacingTokens,
      borderRadius: radiusTokens,
      boxShadow: shadowTokens,
    },
  },
  plugins: [],
};

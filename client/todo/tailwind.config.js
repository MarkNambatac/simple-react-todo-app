const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      body: ["Roboto"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
});

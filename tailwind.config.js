/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto"],
        secondary: ["Nunito"],
        infinit: ["Anton"],

      },
      colors: {
        primary: "#00243f",
        secondary: "#a3acb1",
        tertiary: "#264b77",
        alternative: "#b67929",
      },
    },
  },
  plugins: [],
};

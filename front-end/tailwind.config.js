/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./comps/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pichanga: "#22AF53",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};

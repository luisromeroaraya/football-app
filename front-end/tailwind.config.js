/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./comps/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pichanga: "#22AF53",
      },
      keyframes: {
        shadowScale: {
          "0%": {},
          "50%": { transform: "scaleX(1)", opacity: "0.8" },
          "100%": {},
        },
        bounce: {
          "0%": {},
          "50%": { transform: "translateY(100px)" },
          "100%": {},
        },
        roll: {
          "0%": {},
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        shadowScale: "shadowScale 1s ease-in-out infinite",
        bounce: "bounce 1s cubic-bezier(0.68, 0.35, 0.29, 0.54) infinite",
        roll: "roll 0.7s linear infinite",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};

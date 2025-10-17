/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#22d3ee", dark: "#0ea5b7", light: "#99f6fc" }
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.12)" }
    }
  },
  plugins: []
};
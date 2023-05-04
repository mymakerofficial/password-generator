/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#f6f8f9",
          100: "#edeef0",
          200: "#dadbde",
          300: "#c1c2c6",
          400: "#a8a9ae",
          500: "#83868e",
          600: "#5e616a",
          700: "#383a43",
          800: "#1e2027",
          900: "#14151a",
        },
      },
    },
  },
  plugins: [],
}
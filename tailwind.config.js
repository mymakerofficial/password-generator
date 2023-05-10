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
          50: "#fefefe",
          100: "#f8f9f9",
          200: "#efeff0",
          300: "#e2e1e2",
          400: "#ceced0",
          500: "#414348",
          600: "#292b32",
          700: "#1e1f25",
          800: "#101217",
          900: "#060608",
        },
      },
    },
  },
  plugins: [],
}
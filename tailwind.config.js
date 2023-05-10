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
          50: "#f7f8f9",
          100: "#edeef1",
          200: "#d1d2d7",
          300: "#9b9da1",
          400: "#68696e",
          500: "#404247",
          600: "#282a30",
          700: "#1d1e24",
          800: "#101115",
          900: "#040506",
        },
      },
    },
  },
  plugins: [],
}
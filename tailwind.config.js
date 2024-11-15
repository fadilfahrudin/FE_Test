/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        light: '#E9E9E9',
        dark: '#141414',
        blue: '#08448E',
        blueLight: '#2B54D9',
        yellow: '#FDCD00'
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-1': '#CFF0EA',
        'brand-2': '#88C9C4',
        'brand-3': '#3E9B94',
        'brand-4': '#20666B',
        'brand-5': '#0C3B45',
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'changa': ['"Changa One"', 'sans-serif'],
        'geist': ['"Geist Pixel"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

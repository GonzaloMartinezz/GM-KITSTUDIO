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
        studio: {
          cream: '#ECE6DC',
          warm: '#F4EFE6',
          border: '#E1D9CC',
          slate: '#546A7E',
          deepslate: '#364B5D',
          mist: '#8CA0B2',
          pill: 'rgba(255, 255, 255, 0.72)',
          pillFocus: 'rgba(255, 255, 255, 0.94)',
          card: 'rgba(255, 255, 255, 0.42)'
        }
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'changa': ['"Changa One"', 'sans-serif'],
        'geist': ['"Geist Pixel"', 'sans-serif'],
        'display': ['Oswald', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        gray: {
          100: '#F2F2F2',
          200: '#E5E5E5',
          300: '#CCCCCC',
          400: '#B2B2B2',
          500: '#999999',
          600: '#808080',
          700: '#666666',
          800: '#4D4D4D',
          900: '#333333',
          950: '#1A1A1A',
        },
      },
      width: {
        '2.6': '0.65rem', // 30% larger than w-2 (0.5rem)
      },
      height: {
        '2.6': '0.65rem', // 30% larger than h-2 (0.5rem)
      },
    },
  },
  plugins: [],
}
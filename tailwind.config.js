/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vccp: {
          gold: '#C9A84C',
          dark: '#1A1A1A',
          charcoal: '#2C2C2C',
          cream: '#F5F0E8',
          red: '#8B1A1A',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'vccp-gold': '#C9A84C',
        'vccp-orange': '#E85D04',
        'vccp-orange-light': '#FF7A2F',
        'vccp-orange-dark': '#C44D00',
        'vccp-dark': '#1A1A1A',
        'vccp-charcoal': '#2D2D2D',
        'vccp-cream': '#FFF5EE',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};

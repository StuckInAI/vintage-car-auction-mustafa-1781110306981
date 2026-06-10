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
        'vccp-dark': '#1A1A1A',
        'vccp-charcoal': '#2D2D2D',
        'vccp-cream': '#F5F0E8',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};

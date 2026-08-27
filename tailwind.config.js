/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-reverse': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        }
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 35s linear infinite',
        'infinite-scroll-reverse': 'infinite-scroll-reverse 35s linear infinite',
      },
    },
  },
  plugins: [],
};

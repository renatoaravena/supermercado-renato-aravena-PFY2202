/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { primary: '#0284c7', secondary: '#0369a1', light: '#e0f2fe' },
      },
    },
  },
  plugins: [],
};

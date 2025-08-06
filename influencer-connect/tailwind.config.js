/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
  animation: {
    'bounce-slow': 'bounce 3s infinite',
  },
}

};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        globalBlack: '#0F0F0F', // ✅ valid
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector', // <--- INI KUNCINYA! Biar tombolnya berfungsi.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
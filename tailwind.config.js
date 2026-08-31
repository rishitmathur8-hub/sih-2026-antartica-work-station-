/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polar: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B',
          600: '#5BC0BE',
          500: '#6FFFE9',
          accent: '#38BDF8',
          danger: '#EF4444',
          warning: '#F59E0B',
          success: '#10B981',
        }
      }
    },
  },
  plugins: [],
}

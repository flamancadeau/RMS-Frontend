/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rrms: {
          navy: {
            DEFAULT: '#1F3864', // Primary Navy
            dark: '#14294A',   // Navy Dark for hover/active states
          },
          green: {
            DEFAULT: '#1E7145', // Secondary Green
            light: '#2E9E5B',   // Chart accents
          },
          gold: '#F2C744',      // Accent Gold
          red: '#C0392B',       // Danger Red
          grey: '#595959',      // Neutral Grey
          bgLight: '#F7F9FC',   // Background Light
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E31E24',
        secondary: '#2D2D2D',
        'light-gray': '#F5F5F5',
        success: '#10B981',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'button': '0 4px 12px rgba(227, 30, 36, 0.2)',
      },
    },
  },
  plugins: [],
}

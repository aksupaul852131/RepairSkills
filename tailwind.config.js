/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: '#0dd354',
        secondry: '#1F2937',
      },
      variants: {
        extend: {
          border: ['focus'],
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

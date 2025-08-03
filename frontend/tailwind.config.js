// D:\LawLens\frontend\tailwind.config.js

import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff', 200: '#e0f2fe', 300: '#a5f3fc', 500: '#06b6d4', 700: '#0e7490', 900: '#164e63',
        },
        secondary: {
          50: '#fdf2f8', 200: '#fbcfe8', 300: '#f0abfc', 500: '#d946ef', 700: '#a21caf', 900: '#701a75',
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}
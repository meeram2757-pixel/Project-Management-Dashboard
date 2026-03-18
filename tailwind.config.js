/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient':
          'radial-gradient(circle at top left, rgba(255,255,255,0.7), rgba(148,163,184,0.15))',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['winter', 'night'],
  },
}


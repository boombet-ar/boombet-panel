/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto le dice a Tailwind dónde buscar clases
  ],
  theme: {
    extend: { // <-- 'extend' es importante
      colors: {
        // Paleta de colores personalizada de BoomBet
        'boombet-green': {
          DEFAULT: '#34D399',
          '500': '#10B981',
          '600': '#059669',
        },
        'boombet-dark': {
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        }
      }
    },
  },
  plugins: [],
}
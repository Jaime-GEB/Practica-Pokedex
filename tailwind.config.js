/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        // Custom responsive sizes for Pokedex container
        'pokedex-w': 'clamp(280px, 95vw, 480px)',
        'pokedex-h': 'clamp(180px, 60vw, 280px)',
        'screen-w': 'clamp(240px, 85vw, 432px)',
        'screen-h': 'clamp(120px, 45vw, 192px)',
      },
      fontSize: {
        // Responsive font sizes
        'xs-responsive': 'clamp(6px, 1.5vw, 10px)',
        'sm-responsive': 'clamp(8px, 2vw, 12px)',
        'base-responsive': 'clamp(10px, 2.5vw, 14px)',
      },
      width: {
        '25': '100px',
        '30': '120px',
        '32': '128px',
        '40': '160px',
        '100': '400px',
        '108': '432px',
        '120': 'clamp(280px, 95vw, 480px)',
      },
      height: {
        '50': '200px',
        '55': '220px',
        '70': 'clamp(180px, 60vw, 280px)',
        '48': '192px',
      },
      borderRadius: {
        '10rem': '10rem',
        '15rem': '15rem',
      },
      boxShadow: {
        'inset-2xl': 'inset 0 2px 4px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}

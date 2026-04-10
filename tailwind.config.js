/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        // Pokedex container in rem (base 16px, but html is 32px for 200% zoom)
        '25': '6.25rem',    // 100px at normal, 200px at 200%
        '30': '7.5rem',     // 120px at normal, 240px at 200%
        '40': '10rem',      // 160px at normal, 320px at 200%
        '50': '12.5rem',    // 200px at normal, 400px at 200%
        '55': '13.75rem',   // 220px at normal, 440px at 200%
        '70': '17.5rem',    // 280px at normal, 560px at 200%
        '95': '23.75rem',   // 380px at normal, 760px at 200%
        '100': '25rem',     // 400px at normal, 800px at 200%
        '108': '27rem',     // 432px at normal, 864px at 200%
        '120': '30rem',     // 480px at normal, 960px at 200%
      },
      fontSize: {
        // Responsive font sizes in rem
        'xs-responsive': '0.375rem',   // 6px
        'sm-responsive': '0.5rem',     // 8px
        'base-responsive': '0.625rem', // 10px
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


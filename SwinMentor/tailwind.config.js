// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 1s ease-in-out',
          'fade-in-delay': 'fadeIn 1s ease-in-out 2s forwards',
          'type-in': 'typeIn 2s steps(20) forwards',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          typeIn: {
            '0%': { width: 0 },
            '100%': { width: '100%' },
          },
        },
      },
    },
    plugins: [],
  }
  
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orbit: {
          bg: '#070912',
          panel: 'rgba(18, 25, 45, 0.62)',
          line: 'rgba(117, 135, 255, 0.28)',
          neonBlue: '#55b6ff',
          neonPurple: '#a855f7',
          neonCyan: '#22d3ee',
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(17, 24, 39, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(34,211,238,0.2)' },
          '50%': { boxShadow: '0 0 24px rgba(34,211,238,0.55)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

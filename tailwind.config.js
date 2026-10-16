/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: '#121417',
        charcoal: '#1A1D23',
        subway: '#1E2228',
        chalk: '#F9FAFB',
        tangerine: {
          DEFAULT: '#F26A21',
          hover: '#E05A11',
          light: '#FF8847',
          glow: 'rgba(242, 106, 33, 0.4)',
        },
        crust: '#E07A28',
        emerald: {
          campus: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        birch: {
          DEFAULT: '#E5D7C5',
          light: '#F3ECE3',
          dark: '#C8B59E',
        },
      },
      fontFamily: {
        display: ['Outfit', 'Syne', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(242, 106, 33, 0.35)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
        'subtle-card': '0 8px 30px rgba(0, 0, 0, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'subway-pattern': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'steam': 'steam 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '50%': { transform: 'translateY(-12px) scaleX(1.15)', opacity: '0.6' },
          '100%': { transform: 'translateY(-24px) scaleX(1.3)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}

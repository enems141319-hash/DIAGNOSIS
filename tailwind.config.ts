import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        bone: '#f2f2f2',
        accent: '#ff4d2e',
        surface: {
          0: '#050505',
          1: '#0d0d0d',
          2: '#141414',
          3: '#1c1c1c',
          4: '#242424',
        },
        ink: {
          1: 'rgba(242, 242, 242, 0.96)',
          2: 'rgba(242, 242, 242, 0.72)',
          3: 'rgba(242, 242, 242, 0.48)',
        },
      },
      boxShadow: {
        ambient: '0 6px 32px rgba(255, 77, 46, 0.42)',
        insetGlow: 'inset 0 0 0 1px rgba(255, 77, 46, 0.3)',
      },
      borderRadius: {
        monolith: '3rem',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

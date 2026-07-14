/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2545',
          50: '#EBF0F6',
          100: '#CFDCE9',
          200: '#9FB9D3',
          300: '#6F96BD',
          400: '#3F73A7',
          500: '#1F5591',
          600: '#154475',
          700: '#0D3359',
          800: '#0B2545',
          900: '#06182B',
        },
        sky: {
          DEFAULT: '#3DA5D9',
          50: '#EFF8FE',
          100: '#DCEEFB',
          200: '#B8DDF7',
          300: '#94CCF3',
          400: '#5DB6E2',
          500: '#3DA5D9',
          600: '#2987BC',
          700: '#1E6995',
          800: '#134B6D',
          900: '#082D45',
        },
        ink: '#0B2545',
        slatey: '#64748B',
        soft: '#F6F9FC',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '72rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
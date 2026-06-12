/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: '#FDFCFA', // Map default white to warm cream (calm)
        primary: {
          DEFAULT: '#224229',
          50: '#F4F6F4',
          100: '#E4EAE4',
          200: '#C8D5C8',
          300: '#9FB89F',
          400: '#6F976F',
          500: '#224229',
          600: '#1A3320',
          700: '#132618',
          800: '#0E1B11',
          900: '#09110B',
        },
        secondary: {
          DEFAULT: '#4E6551',
          50: '#F5F7F5',
          100: '#E6EAE6',
          205: '#C7D1C7',
          300: '#9EB19E',
          450: '#758F75',
          500: '#4E6551',
          600: '#3C4E3F',
          700: '#2A372C',
        },
        accent: {
          DEFAULT: '#88A47E',
          50: '#F8FAF7',
          100: '#ECEFEA',
          200: '#D7DDD3',
          300: '#BDC7B9',
          400: '#88A47E',
          500: '#6C8962',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5ebe6',
          200: '#ccd9cf',
          300: '#a7bfae',
          400: '#7c9f86',
          500: '#5e8269',
          600: '#486852',
          700: '#3c5443',
          800: '#324437',
          900: '#2b392f',
          950: '#151e18',
        },
        beige: {
          50: '#FDFCFA',  // Clean warm cream
          100: '#F5F3EB', // Soothing warm sand
          200: '#EAE7DC', // Soft beige
          300: '#D8D4C5', // Medium beige
          400: '#c5baa6',
          500: '#af9f87',
          600: '#9b8870',
          700: '#816f5c',
          850: '#5A5446',
          900: '#484338',
          950: '#28251F',
        },
        slateBg: '#F5F3EB',
        slateText: '#181E19',
        successColor: '#10B981',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        wedding: {
          gold: '#d4af37',
          cream: '#f8f6f0',
          sage: '#9caf88',
          charcoal: '#2c2c2c',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#111827',
            },
            h3: {
              color: '#111827',
            },
            h4: {
              color: '#111827',
            },
          },
        },
      },
      letterSpacing: {
        'wide': '0.1em',
        'wider': '0.15em',
        'widest': '0.2em',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 

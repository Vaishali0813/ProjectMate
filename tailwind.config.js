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
        plum: {
          50: '#FDF8FA',
          100: '#F8ECEC', // Soft Blush
          200: '#F0D5E4',
          300: '#DFB2CF',
          400: '#C885B2',
          500: '#A87291', // Muted Mauve
          600: '#7E2A5D',
          700: '#560C38', // Primary Burgundy
          800: '#42092B',
          900: '#300B25', // Deep Plum
          950: '#1F0517',
        },
        burgundy: {
          DEFAULT: '#560C38',
          dark: '#3D0726',
          light: '#6D1549',
          subtle: '#F4E8EE',
        },
        mauve: {
          DEFAULT: '#A87291',
          light: '#C18CA8',
          dark: '#824B6D',
          soft: '#F5E8EE',
        },
        gold: {
          DEFAULT: '#E9C9A0', // Champagne Gold
          light: '#F5DEBF',
          dark: '#CCA576',
          metallic: '#BA8E57',
          border: 'rgba(233, 201, 160, 0.45)',
        },
        warm: {
          ivory: '#FFFAF6', // Warm Ivory (Primary light background)
          blush: '#F8ECEC', // Soft Blush (Alternating section background)
          white: '#FFFDFB',
          cream: '#FAF1E8',
          light: '#FFF8F2',
        },
        dark: {
          bg: '#24071B',      // Refined Deep Plum background (eliminates harsh black)
          surface: '#300B25', // Deep Plum surface
          card: '#43132F',    // Dark Card Surface
          hover: '#541B3D',   // Interactive hover state
          border: 'rgba(233, 201, 160, 0.22)',
          subtle: '#370F28',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'plum-subtle': '0 4px 20px -2px rgba(86, 12, 56, 0.08)',
        'plum-hover': '0 12px 30px -4px rgba(86, 12, 56, 0.16)',
        'gold-glow': '0 0 25px rgba(233, 201, 160, 0.25)',
        'dark-card': '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'plum-gradient': 'linear-gradient(135deg, #560C38 0%, #300B25 100%)',
        'mauve-gradient': 'linear-gradient(135deg, #A87291 0%, #560C38 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E9C9A0 0%, #CCA576 100%)',
        'hero-light': 'radial-gradient(ellipse at top left, #FFFAF6 0%, #F8ECEC 50%, #FFFAF6 100%)',
        'hero-dark': 'radial-gradient(ellipse at top left, #3C122D 0%, #300B25 55%, #24071B 100%)',
      }
    },
  },
  plugins: [],
}

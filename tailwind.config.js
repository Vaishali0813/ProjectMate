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
          50: '#FDF7FB',
          100: '#F9ECF5',
          200: '#F1D5E8',
          300: '#E4B4D5',
          400: '#D089BD',
          500: '#A66B91', // Dusty Mauve
          600: '#7E3667',
          700: '#61194E',
          800: '#470735', // Deep Plum
          900: '#340426',
          950: '#200117',
        },
        mauve: {
          DEFAULT: '#A66B91',
          light: '#BD89AB',
          dark: '#874D73',
          soft: '#EEDCE7',
        },
        gold: {
          DEFAULT: '#F1D5B5',
          light: '#F8E7D4',
          dark: '#D8B388',
          metallic: '#C89B63',
          border: 'rgba(241, 213, 181, 0.4)',
        },
        warm: {
          white: '#FFF8F2',
          cream: '#FAF1E8',
          light: '#FFFDFB',
        },
        dark: {
          bg: '#140210',
          surface: '#1E0418',
          card: '#270620',
          hover: '#340A2B',
          border: '#45103A',
          subtle: '#2F0826',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'plum-subtle': '0 4px 20px -2px rgba(71, 7, 53, 0.08)',
        'plum-hover': '0 12px 30px -4px rgba(71, 7, 53, 0.16)',
        'gold-glow': '0 0 25px rgba(241, 213, 181, 0.25)',
        'dark-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'plum-gradient': 'linear-gradient(135deg, #470735 0%, #200117 100%)',
        'mauve-gradient': 'linear-gradient(135deg, #A66B91 0%, #470735 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F1D5B5 0%, #D8B388 100%)',
        'hero-light': 'radial-gradient(ellipse at top left, #FFF8F2 0%, #F9ECF5 50%, #FFF8F2 100%)',
        'hero-dark': 'radial-gradient(ellipse at top left, #270620 0%, #140210 60%, #0A0108 100%)',
      }
    },
  },
  plugins: [],
}

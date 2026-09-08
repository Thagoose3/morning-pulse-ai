/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tea: {
          bg: '#fbf9f5',
          card: '#ffffff',
          cardSubtle: '#f7f4ed',
          border: '#e8e2d8',
          borderHover: '#c5dec9',
          brown: '#3d2e24',
          brownMuted: '#7c6858',
          brownLight: '#ede3d5',
          matcha: '#2e6b45',
          matchaLight: '#eaf3ec',
          matchaBorder: '#b8d9bf',
          terracotta: '#b84848',
          terracottaLight: '#faeded',
          amber: '#9c6628',
          amberLight: '#fcf4ea'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

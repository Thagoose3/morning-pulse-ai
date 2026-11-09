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
        sans: ['Inter', 'IBM Plex Sans Thai', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Noto Serif Thai', 'Georgia', 'serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 0.25s ease-out both',
        'pop-in': 'popIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        'steam': 'steam 3s ease-in-out infinite',
        'aurora': 'aurora 18s ease-in-out infinite alternate',
        'aurora-slow': 'aurora 26s ease-in-out infinite alternate-reverse',
        'shimmer': 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        aurora: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(6%,4%,0) scale(1.12)' },
          '100%': { transform: 'translate3d(-4%,8%,0) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        steam: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(-3px)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

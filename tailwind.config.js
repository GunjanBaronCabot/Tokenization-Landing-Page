/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#101E33',
        muted: '#595959',
      },
      fontFamily: {
        serif: ['Newsreader', 'serif'],
        sans: ['Newsreader', 'serif'],
      },
      boxShadow: {
        pill: 'inset 4px 4px 8px rgba(255,255,255,.3), inset -4px -4px 8px rgba(255,255,255,.3), 0 8px 16px rgba(58,119,229,.5)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
}

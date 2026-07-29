/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lightBgStart: '#FFFFFF',
          lightBgMid: '#FFF8FB',
          lightBgEnd: '#F7F7FF',
          darkBgStart: '#050505',
          darkBgEnd: '#0D2415',
          neonGreen: '#00FF99',
          neonCyan: '#00E5FF',
          neonPink: '#FF007A',
          deepEmerald: '#083B25',
          glassBorderLight: 'rgba(255, 255, 255, 0.35)',
          glassBorderDark: 'rgba(0, 255, 153, 0.25)',
          glassBgLight: 'rgba(255, 255, 255, 0.65)',
          glassBgDark: 'rgba(5, 15, 10, 0.70)',
        },
      },
      backdropBlur: {
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'neon-green': '0 0 25px rgba(0, 255, 153, 0.35)',
        'neon-cyan': '0 0 25px rgba(0, 229, 255, 0.35)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 255, 153, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob-float': 'blobFloat 10s infinite ease-in-out',
        'glow-pulse': 'glowPulse 3s infinite ease-in-out',
      },
      keyframes: {
        blobFloat: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

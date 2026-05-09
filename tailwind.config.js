/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        bg: '#050810',
        bg2: '#0d121f',
        bg3: '#161c2d',
        teal: '#2563eb',
        cyan: '#60a5fa',
        accent: '#facc15',
        accent2: '#eab308',
        violet: '#1e40af',
        'text-muted': '#94a3b8',
        'text-dim': '#64748b',
      },
      keyframes: {
        aurora1: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(4vw,6vh) scale(1.08)' },
        },
        aurora2: {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '100%': { transform: 'translate(-5vw,-4vh) rotate(12deg) scale(1.12)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.5)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '200%' },
        },
        pFloat: {
          '0%': { transform: 'translateY(110vh) scale(0) rotate(0deg)', opacity: '0' },
          '5%': { opacity: '1' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-10vh) scale(1) rotate(360deg)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        panelGlow: {
          '0%,100%': { boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.08)' },
          '50%': { boxShadow: '0 8px 50px rgba(0,0,0,0.4), 0 0 24px rgba(37,99,235,0.15)' },
        },
        lbPop: {
          from: { transform: 'scale(0.86)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        aurora1: 'aurora1 20s ease-in-out infinite alternate',
        aurora2: 'aurora2 25s ease-in-out infinite alternate',
        twinkle: 'twinkle var(--dur,3s) ease-in-out infinite',
        blink: 'blink 2s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        pFloat: 'pFloat linear infinite',
        fadeIn: 'fadeIn 0.4s ease both',
        panelGlow: 'panelGlow 5s ease-in-out infinite',
        lbPop: 'lbPop 0.28s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
};

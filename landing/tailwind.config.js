/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050505',
          accent: '#00FF9D',
          purple: '#7000FF',
          neon: {
            green: '#00FF9D',
            purple: '#7000FF',
            blue: '#00eeff'
          },
          cyber: {
            black: '#050505',
            gray: '#1a1a1a'
          }
        }
      },
      backgroundImage: {
        'aurora': 'linear-gradient(135deg, #00FF9D10 0%, #7000FF10 30%, #00eeff10 70%, #050505 100%)',
        'aurora-animated': `
          linear-gradient(135deg, #00FF9D15 0%, #7000FF15 30%, #00eeff15 70%, #050505 100%),
          radial-gradient(circle at 10% 20%, #00FF9D20 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, #7000FF20 0%, transparent 20%),
          radial-gradient(circle at 50% 50%, #00eeff10 0%, transparent 30%)
        `,
      },
      animation: {
        'aurora-flow': 'auroraFlow 15s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'floatGentle 10s ease-in-out infinite',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        auroraFlow: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            opacity: '0.5'
          },
          '50%': {
            backgroundPosition: '100% 50%',
            opacity: '0.8'
          }
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(0, 255, 157, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(112, 0, 255, 0.5)'
          }
        },
        floatGentle: {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)'
          },
          '25%': {
            transform: 'translateY(-10px) translateX(-5px)'
          },
          '50%': {
            transform: 'translateY(-5px) translateX(5px)'
          },
          '75%': {
            transform: 'translateY(-15px) translateX(0)'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glowPulse: {
          '0%, 100%': {
            filter: 'brightness(1) saturate(1.2)',
            opacity: '1'
          },
          '50%': {
            filter: 'brightness(1.2) saturate(1.5)',
            opacity: '1.1'
          }
        }
      }
    },
  },
  plugins: [],
};
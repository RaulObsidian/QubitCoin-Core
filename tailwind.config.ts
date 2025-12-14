import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Paleta Nebulae (Colores específicos para el diseño cyberpunk institucional)
        'nebulae-black': '#050505',      // Negro profundo para fondos
        'nebulae-neon-green': '#00ff9d', // Verde neón para acentos
        'nebulae-quantum-violet': '#7000ff', // Violeta cuántico para elementos destacados
        'nebulae-electric-blue': '#00eeff', // Azul eléctrico para efectos
        'nebulae-dark-gray': '#1a1a1a', // Gris oscuro para superficies
        'nebulae-light-gray': '#2a2a2a', // Gris claro para elementos
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00ff9d, 0 0 20px #00ff9d' },
          'to': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #7000ff, 0 0 40px #7000ff' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
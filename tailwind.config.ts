import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        'quantum-dark': {
          900: 'var(--quantum-dark-900)',
          800: 'var(--quantum-dark-800)',
          700: 'var(--quantum-dark-700)',
        },
        'quantum-light': {
          50: 'var(--quantum-light-50)',
          100: 'var(--quantum-light-100)',
          200: 'var(--quantum-light-200)',
        },
        'quantum-cyan': 'var(--quantum-cyan)',
        'quantum-blue': 'var(--quantum-blue)',
        'quantum-navy': 'var(--quantum-navy)',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        sora: ['Sora', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-glow": {
          '0%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(100, 255, 218, 0.8), 0 0 80px rgba(100, 255, 218, 0.3)' }
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        "wave-collapse": {
          '0%': { 
            opacity: '0.7', 
            filter: 'blur(10px)', 
            transform: 'scale(1.1)' 
          },
          '100%': { 
            opacity: '1', 
            filter: 'blur(0px)', 
            transform: 'scale(1)' 
          }
        },
        "particle-drift": {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(30px, -30px) rotate(90deg)' },
          '50%': { transform: 'translate(-20px, -60px) rotate(180deg)' },
          '75%': { transform: 'translate(-40px, -20px) rotate(270deg)' }
        },
        "tunnel": {
          '0%': { transform: 'translateX(0) scale(1)', opacity: '1' },
          '50%': { transform: 'translateX(50px) scale(0.8)', opacity: '0.3' },
          '100%': { transform: 'translateX(100px) scale(1)', opacity: '1' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
        "wave-collapse": "wave-collapse 1.5s ease-out forwards",
        "particle-drift": "particle-drift 8s ease-in-out infinite",
        "tunnel": "tunnel 2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

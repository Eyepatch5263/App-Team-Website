/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Enhanced professional color palette with better contrast and depth
        'primary-dark': '#0A0F1C',
        'secondary-dark': '#1A2332',
        'tertiary-dark': '#2A3441',
        'primary-text': '#FFFFFF',
        'secondary-text': '#F1F5F9',
        'muted-text': '#94A3B8',
        'accent-primary': '#3B82F6',
        'accent-secondary': '#8B5CF6',
        'accent-tertiary': '#06B6D4',
        'accent-success': '#10B981',
        'accent-warning': '#F59E0B',
        'accent-error': '#EF4444',
        'glass-white': 'rgba(255, 255, 255, 0.08)',
        'glass-border': 'rgba(255, 255, 255, 0.15)',
        'hover-bg': 'rgba(255, 255, 255, 0.12)',
        'neutral-50': '#F8FAFC',
        'neutral-100': '#F1F5F9',
        'neutral-200': '#E2E8F0',
        'neutral-300': '#CBD5E1',
        'neutral-400': '#94A3B8',
        'neutral-500': '#64748B',
        'neutral-600': '#475569',
        'neutral-700': '#334155',
        'neutral-800': '#1E293B',
        'neutral-900': '#0F172A',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'inria': ['Inria Sans', 'sans-serif'],
        'inria-serif':["Inria Serif"]
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'code-rain': 'codeRain 20s linear infinite',
        'code-rain-mobile': 'codeRainMobile 15s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'particle-float': 'particleFloat 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        codeRain: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        codeRainMobile: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.3' },
          '25%': { transform: 'translateY(-15px) translateX(5px)', opacity: '0.6' },
          '50%': { transform: 'translateY(-10px) translateX(-5px)', opacity: '0.8' },
          '75%': { transform: 'translateY(-20px) translateX(3px)', opacity: '0.4' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1)',
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)',
            transform: 'scale(1.02)'
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '475px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    // --- Colors from theme.extend.colors ---
    'primary-dark', 'secondary-dark', 'tertiary-dark',
    'primary-text', 'secondary-text', 'muted-text',
    'accent-primary', 'accent-secondary', 'accent-tertiary',
    'accent-success', 'accent-warning', 'accent-error',
    'glass-white', 'glass-border', 'hover-bg',
    'neutral-50', 'neutral-100', 'neutral-200', 'neutral-300',
    'neutral-400', 'neutral-500', 'neutral-600', 'neutral-700',
    'neutral-800', 'neutral-900',

    // --- Dynamic classes from NewsSection.tsx and AnnouncementsPage.tsx ---

    // Background colors (bg-{color}, bg-{color}/XX)
    'bg-accent-primary', 'bg-accent-primary/10', 'bg-accent-primary/20',
    'bg-accent-secondary', 'bg-accent-secondary/10', 'bg-accent-secondary/20',
    'bg-accent-tertiary', 'bg-accent-tertiary/10', 'bg-accent-tertiary/20',
    'bg-accent-success', 'bg-accent-success/10', 'bg-accent-success/20',
    'bg-accent-warning', 'bg-accent-warning/10', 'bg-accent-warning/20',
    'bg-accent-error', 'bg-accent-error/10', 'bg-accent-error/20',
    'bg-glass-white', 'bg-glass-white/50',
    'bg-hover-bg',
    'bg-primary-dark/90', // For modal background

    // Text colors (text-{color}, text-{color}/XX)
    'text-accent-primary', 'text-accent-primary/80',
    'text-accent-secondary', 'text-accent-secondary/80',
    'text-accent-tertiary',
    'text-accent-success', 'text-accent-success/80',
    'text-accent-warning',
    'text-accent-error', 'text-accent-error/80',
    'text-primary-text', 'text-primary-text/30', 'text-primary-text/60', 'text-primary-text/80',
    'text-secondary-text',
    'text-muted-text',

    // Border colors (border-{color}, border-{color}/XX)
    'border-accent-primary', 'border-accent-primary/30',
    'border-accent-secondary', 'border-accent-secondary/30',
    'border-accent-tertiary', 'border-accent-tertiary/30',
    'border-accent-success', 'border-accent-success/30',
    'border-accent-warning', 'border-accent-warning/30',
    'border-accent-error', 'border-accent-error/30',
    'border-glass-border',

    // Gradient 'from-' and 'to-' classes
    'from-accent-primary/10', 'to-accent-secondary/5',
    'from-accent-secondary/10', 'to-accent-tertiary/5',
    'from-accent-tertiary/10', 'to-accent-success/5',
    'from-accent-success/10', 'to-accent-success/5', // Added for API fetched news
  ],
};
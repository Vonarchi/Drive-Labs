import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        xs: '6px',
        md: '12px',
        xl: '16px',
        '2xl': '24px'
      },
      colors: {
        // semantic surface tokens
        bg: 'hsl(var(--bg))',
        fg: 'hsl(var(--fg))',
        muted: 'hsl(var(--muted))',
        ring: 'hsl(var(--ring))',
        // brand scale
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          50: 'hsl(var(--brand-50))',
          100: 'hsl(var(--brand-100))',
          600: 'hsl(var(--brand-600))',
          700: 'hsl(var(--brand-700))'
        },
        danger: 'hsl(var(--danger))',
        warning: 'hsl(var(--warning))',
        success: 'hsl(var(--success))',
        // high contrast variants for accessibility
        'fg-high-contrast': 'hsl(var(--fg-high-contrast))',
        'muted-high-contrast': 'hsl(var(--muted-high-contrast))',
        'brand-high-contrast': 'hsl(var(--brand-high-contrast))',
        'danger-high-contrast': 'hsl(var(--danger-high-contrast))',
        'success-high-contrast': 'hsl(var(--success-high-contrast))'
      },
      spacing: {
        // 4pt base + comfy steps
        '0.5': '2px', '1': '4px', '1.5': '6px', '2': '8px', '3': '12px', '4': '16px',
        '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px'
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px']
      },
      boxShadow: {
        focus: '0 0 0 3px hsl(var(--ring) / 0.5)'
      }
    }
  },
  plugins: []
} satisfies Config

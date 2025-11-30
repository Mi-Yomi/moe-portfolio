/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#000000",
        },
        accent: {
          DEFAULT: "#00F5A0",
          dark: "#00D68F",
        },
        background: {
          primary: "#FFFFFF",
          secondary: "#F7F7F7",
          tertiary: "#EBEBEB",
          dark: "#0A0A0A",
        },
        surface: {
          card: "#FFFFFF",
          elevated: "#FFFFFF",
          dark: "#141414",
        },
        text: {
          primary: "#000000",
          secondary: "#6B6B6B",
          tertiary: "#9B9B9B",
          placeholder: "#ABABAB",
          inverse: "#FFFFFF",
        },
        border: {
          DEFAULT: "#E5E5E5",
          subtle: "#F0F0F0",
          strong: "#D0D0D0",
          dark: "#2A2A2A",
        },
        interactive: {
          hover: "#F5F5F5",
          pressed: "#EBEBEB",
        },
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.08)',
        'xl': '0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        'xxs': '2px',
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'xxl': '32px',
        'xxxl': '48px',
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '1.4' }],
        'sm': ['13px', { lineHeight: '1.4' }],
        'base': ['14px', { lineHeight: '1.5' }],
        'md': ['16px', { lineHeight: '1.5' }],
        'lg': ['18px', { lineHeight: '1.4' }],
        'xl': ['24px', { lineHeight: '1.3' }],
        'xxl': ['32px', { lineHeight: '1.2' }],
        '3xl': ['40px', { lineHeight: '1.1' }],
        '4xl': ['56px', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [],
}

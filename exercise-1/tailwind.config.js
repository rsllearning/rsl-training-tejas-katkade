/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared theme design tokens: Primary colors
        brandPrimary: {
          light: '#3b82f6',
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        // Shared theme design tokens: Text colors
        brandText: {
          primary: '#0f172a',
          secondary: '#475569',
          muted: '#94a3b8',
          light: '#ffffff',
        },
        // Shared theme design tokens: Background colors
        brandBg: {
          main: '#f8fafc',
          card: '#ffffff',
          sidebar: '#0f172a',
          sidebarHover: '#1e293b',
        },
      },
      spacing: {
        // Shared theme design tokens: Spacing values
        tokenPadding: '1.5rem',
        tokenGap: '1.5rem',
      },
      borderRadius: {
        // Shared theme design tokens: Border radius
        tokenCard: '0.75rem',
        tokenBtn: '0.5rem',
        tokenBadge: '9999px',
      },
    },
  },
  plugins: [],
}

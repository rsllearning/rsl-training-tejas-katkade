import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * Shared Type-Safe Design Tokens & Theme Values.
 * Using Vanilla Extract's `createGlobalTheme` creates a strongly typed CSS variables contract.
 * Any component consuming `vars` receives full TypeScript autocompletion and type-safety.
 */
export const vars = createGlobalTheme(':root', {
  color: {
    // Primary brand colors
    primary: {
      main: '#2563eb',
      hover: '#1d4ed8',
      active: '#1e40af',
      text: '#ffffff',
    },
    // Secondary brand colors
    secondary: {
      main: '#475569',
      hover: '#334155',
      active: '#1e293b',
      text: '#ffffff',
    },
    // Danger / destructive colors
    danger: {
      main: '#dc2626',
      hover: '#b91c1c',
      active: '#991b1b',
      text: '#ffffff',
    },
    // Status colors
    success: {
      bg: '#dcfce7',
      text: '#15803d',
      border: '#bbf7d0',
    },
    warning: {
      bg: '#fef3c7',
      text: '#b45309',
      border: '#fde68a',
    },
    error: {
      bg: '#fee2e2',
      text: '#b91c1c',
      border: '#fecaca',
    },
    // Surfaces & Text
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    borderFocus: '#93c5fd',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
  },
  space: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    xxl: '3rem',    // 48px
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      heading: '1.75rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
    },
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
});

import { style } from '@vanilla-extract/css';
import { vars } from './theme/tokens.css';

export const container = style({
  maxWidth: '1160px',
  margin: '0 auto',
  padding: `${vars.space.md} ${vars.space.sm}`,
  '@media': {
    'screen and (min-width: 768px)': {
      padding: `${vars.space.xl} ${vars.space.lg}`,
    },
    'screen and (min-width: 1024px)': {
      padding: `${vars.space.xxl} ${vars.space.xl}`,
    },
  },
});

export const header = style({
  marginBottom: vars.space.xl,
  paddingBottom: vars.space.lg,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const title = style({
  fontSize: vars.typography.fontSize.heading,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.textPrimary,
  lineHeight: vars.typography.lineHeight.tight,
  marginBottom: vars.space.xs,
});

export const subtitle = style({
  fontSize: vars.typography.fontSize.md,
  color: vars.color.textSecondary,
  lineHeight: vars.typography.lineHeight.normal,
});

export const section = style({
  marginBottom: vars.space.xl,
});

export const sectionHeader = style({
  marginBottom: vars.space.md,
});

export const sectionTitle = style({
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.color.textPrimary,
  marginBottom: vars.space.xs,
});

export const sectionDescription = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.textSecondary,
});

export const demoRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space.md,
  padding: vars.space.md,
  backgroundColor: vars.color.surface,
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
});

export const responsiveGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.lg,
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

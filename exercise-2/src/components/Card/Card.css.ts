import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../theme/tokens.css';

/**
 * Reusable Card Recipe.
 * Demonstrates:
 * - Base styling (consistent background, border radius, shadow, border)
 * - Responsive styling using media queries (spacing adapts between mobile and desktop)
 * - Style composition with variants (elevated, outlined, flat)
 */
export const cardRecipe = recipe({
  base: {
    backgroundColor: vars.color.surface,
    borderRadius: vars.radii.lg,
    color: vars.color.textPrimary,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',

    // Responsive padding using design tokens
    padding: vars.space.md,
    '@media': {
      'screen and (min-width: 768px)': {
        padding: vars.space.lg,
      },
    },
  },
  variants: {
    variant: {
      elevated: {
        border: `1px solid ${vars.color.border}`,
        boxShadow: vars.shadow.md,
        ':hover': {
          boxShadow: vars.shadow.lg,
        },
      },
      outlined: {
        border: `1px solid ${vars.color.border}`,
        boxShadow: vars.shadow.sm,
      },
      flat: {
        backgroundColor: vars.color.background,
        border: `1px solid ${vars.color.border}`,
        boxShadow: 'none',
      },
    },
  },
  defaultVariants: {
    variant: 'elevated',
  },
});

export const cardHeader = style({
  marginBottom: vars.space.md,
  paddingBottom: vars.space.sm,
  borderBottom: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.md,
});

export const cardTitle = style({
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.textPrimary,
  lineHeight: vars.typography.lineHeight.tight,
});

export const cardBody = style({
  flex: 1,
  color: vars.color.textSecondary,
  fontSize: vars.typography.fontSize.sm,
  lineHeight: vars.typography.lineHeight.normal,
});

export const cardFooter = style({
  marginTop: vars.space.md,
  paddingTop: vars.space.sm,
  borderTop: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: vars.space.sm,
});

export type CardVariants = RecipeVariants<typeof cardRecipe>;

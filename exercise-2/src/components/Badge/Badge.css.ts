import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../theme/tokens.css';

/**
 * Type-Safe Badge Recipe.
 * Demonstrates:
 * - Base styling (border radius, padding, typography)
 * - Three semantic variants (success, warning, error) consuming shared design tokens.
 */
export const badgeRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space.xs,
    borderRadius: vars.radii.full,
    padding: `${vars.space.xs} ${vars.space.sm}`,
    fontSize: vars.typography.fontSize.xs,
    fontWeight: vars.typography.fontWeight.semibold,
    lineHeight: vars.typography.lineHeight.tight,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  variants: {
    variant: {
      success: {
        backgroundColor: vars.color.success.bg,
        color: vars.color.success.text,
        borderColor: vars.color.success.border,
      },
      warning: {
        backgroundColor: vars.color.warning.bg,
        color: vars.color.warning.text,
        borderColor: vars.color.warning.border,
      },
      error: {
        backgroundColor: vars.color.error.bg,
        color: vars.color.error.text,
        borderColor: vars.color.error.border,
      },
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

export type BadgeVariants = RecipeVariants<typeof badgeRecipe>;

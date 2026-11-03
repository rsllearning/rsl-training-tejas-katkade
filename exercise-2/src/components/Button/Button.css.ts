import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '../../theme/tokens.css';

/**
 * Type-Safe Button Recipe.
 * Demonstrates style composition: Base styles composed with variants (primary, secondary, danger)
 * and sizes (small, large), along with interaction states (hover, focus-visible, disabled).
 */
export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space.sm,
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.semibold,
    borderRadius: vars.radii.md,
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    textDecoration: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${vars.color.borderFocus}`,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary.main,
        color: vars.color.primary.text,
        ':hover': {
          backgroundColor: vars.color.primary.hover,
        },
        ':active': {
          backgroundColor: vars.color.primary.active,
        },
      },
      secondary: {
        backgroundColor: vars.color.secondary.main,
        color: vars.color.secondary.text,
        ':hover': {
          backgroundColor: vars.color.secondary.hover,
        },
        ':active': {
          backgroundColor: vars.color.secondary.active,
        },
      },
      danger: {
        backgroundColor: vars.color.danger.main,
        color: vars.color.danger.text,
        ':hover': {
          backgroundColor: vars.color.danger.hover,
        },
        ':active': {
          backgroundColor: vars.color.danger.active,
        },
      },
    },
    size: {
      small: {
        padding: `${vars.space.xs} ${vars.space.sm}`,
        fontSize: vars.typography.fontSize.xs,
        lineHeight: vars.typography.lineHeight.tight,
      },
      large: {
        padding: `${vars.space.md} ${vars.space.lg}`,
        fontSize: vars.typography.fontSize.md,
        lineHeight: vars.typography.lineHeight.normal,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

import React, { forwardRef } from 'react';
import { buttonRecipe, type ButtonVariants } from './Button.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    NonNullable<ButtonVariants> {
  children: React.ReactNode;
}

/**
 * Reusable, Type-Safe Button Component.
 * Supports primary, secondary, and danger variants as well as small and large sizes
 * with hover, focus, and disabled interaction states.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'small', className, disabled, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${buttonRecipe({ variant, size })} ${className ?? ''}`.trim()}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

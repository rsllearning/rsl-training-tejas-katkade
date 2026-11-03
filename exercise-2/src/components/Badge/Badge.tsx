import React from 'react';
import { badgeRecipe, type BadgeVariants } from './Badge.css';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    NonNullable<BadgeVariants> {
  children: React.ReactNode;
}

/**
 * Reusable Badge Component.
 * Supports success, warning, and error variants using shared theme tokens.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'success',
  className,
  children,
  ...rest
}) => {
  return (
    <span className={`${badgeRecipe({ variant })} ${className ?? ''}`.trim()} {...rest}>
      {children}
    </span>
  );
};

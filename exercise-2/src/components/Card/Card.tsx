import React from 'react';
import {
  cardRecipe,
  cardHeader,
  cardTitle,
  cardBody,
  cardFooter,
  type CardVariants,
} from './Card.css';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    NonNullable<CardVariants> {
  title?: React.ReactNode;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Reusable Card Component.
 * Composes base styles, token-based border radius, background, shadow, and responsive padding.
 */
export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  title,
  headerRight,
  footer,
  className,
  children,
  ...rest
}) => {
  return (
    <div className={`${cardRecipe({ variant })} ${className ?? ''}`.trim()} {...rest}>
      {(title || headerRight) && (
        <div className={cardHeader}>
          {title && <div className={cardTitle}>{title}</div>}
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className={cardBody}>{children}</div>
      {footer && <div className={cardFooter}>{footer}</div>}
    </div>
  );
};

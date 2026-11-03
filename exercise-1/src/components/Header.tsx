import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  isActionDisabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  actionLabel = 'Add New Product',
  onActionClick,
  isActionDisabled = false,
}) => {
  return (
    <header className="bg-brandBg-card border-b border-slate-200 px-4 md:px-8 py-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title and Subtitle */}
        <div>
          <h2 className="text-2xl font-bold text-brandText-primary tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-brandText-secondary mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Button with Hover, Focus, Disabled states and Design Token radius/colors */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onActionClick}
            disabled={isActionDisabled}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brandPrimary text-white font-medium text-sm rounded-tokenBtn shadow-sm transition-all duration-150 hover:bg-brandPrimary-dark focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brandPrimary cursor-pointer"
          >
            <span className="text-base leading-none font-bold">+</span>
            <span>{actionLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

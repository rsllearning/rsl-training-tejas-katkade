import React from 'react';
import type { Product, ProductStatus } from '../types';

interface ProductCardProps {
  product: Product;
  onAction?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAction }) => {
  const isOutOfStock = product.status === 'Out of Stock';

  const getStatusBadgeStyle = (status: ProductStatus) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Low Stock':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Out of Stock':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <article className="flex flex-col h-full bg-brandBg-card rounded-tokenCard border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Status Badge overlay */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-tokenBadge border shadow-xs ${getStatusBadgeStyle(
            product.status
          )}`}
        >
          {product.status}
        </span>
      </div>

      {/* Card Body - Uses configured tokenPadding */}
      <div className="flex flex-col flex-1 p-tokenPadding justify-between">
        <div>
          {/* Category */}
          <p className="text-xs font-medium uppercase tracking-wider text-brandText-muted">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="mt-1 text-base font-semibold text-brandText-primary line-clamp-1">
            {product.name}
          </h3>

          {/* Pricing and Stock info */}
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-xl font-bold text-brandText-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-brandText-secondary">
              {isOutOfStock ? '0 units' : `${product.stockCount} in stock`}
            </span>
          </div>
        </div>

        {/* Action Button: Demonstrates hover, focus, and disabled state styling via Tailwind variants */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => onAction?.(product)}
            className="w-full py-2.5 px-4 rounded-tokenBtn font-medium text-sm text-white bg-brandPrimary shadow-xs transition-colors duration-150 hover:bg-brandPrimary-dark focus:outline-none focus:ring-2 focus:ring-brandPrimary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brandPrimary cursor-pointer"
          >
            {isOutOfStock ? 'Unavailable' : 'Add to Order'}
          </button>
        </div>
      </div>
    </article>
  );
};

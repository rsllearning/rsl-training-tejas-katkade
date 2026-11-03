import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAction?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAction }) => {
  return (
    /* Responsive Grid composed via Tailwind utilities:
       - Small screens (< 768px): 1 column (grid-cols-1)
       - Medium screens (>= 768px): 2 columns (md:grid-cols-2)
       - Large screens (>= 1024px): 3 columns (lg:grid-cols-3)
       - Gap uses design token: gap-tokenGap
    */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-tokenGap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAction={onAction} />
      ))}
    </div>
  );
};

import { use } from 'react'
import { ProductCard } from './ProductCard'

export function ProductListSkeleton() {
  return (
    <div className="product-grid">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div key={idx} className="product-card skeleton-card">
          <div className="skeleton-media skeleton-pulse" />
          <div className="product-card-body">
            <div className="skeleton-line skeleton-title skeleton-pulse" />
            <div className="skeleton-line skeleton-desc skeleton-pulse" />
            <div className="skeleton-line skeleton-desc-short skeleton-pulse" />
            <div className="skeleton-row">
              <div className="skeleton-pill skeleton-pulse" />
              <div className="skeleton-btn skeleton-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductList({
  productsPromise,
  searchQuery = '',
  selectedCategory = 'All',
  onSelectProduct,
  onAddToCart,
}) {
  const products = use(productsPromise)

  const filtered = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (filtered.length === 0) {
    return (
      <div className="empty-results-box">
        <p>No products match your search or filter.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {filtered.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

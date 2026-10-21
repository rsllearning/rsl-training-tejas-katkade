import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/productsApi'

/**
 * Product listing component with search and refetch
 */
export function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')

  // Query key structure: ['products'] or ['products', { search: searchTerm }]
  const queryKey = searchTerm.trim()
    ? ['products', { search: searchTerm.trim() }]
    : ['products']

  const {
    data: products,
    isPending,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchProducts(searchTerm),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  })

  return (
    <section className="section-container">
      <div className="section-header">
        <h2>Products</h2>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            🔄 Refresh Products
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-toolbar">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Background fetching indicator using isFetching */}
        {isFetching && !isPending && (
          <span className="fetching-indicator">
            <span className="mini-spinner" /> Updating...
          </span>
        )}
      </div>

      {/* Initial Loading State: isPending */}
      {isPending && (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading products...</p>
        </div>
      )}

      {/* Error State: isError */}
      {isError && (
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h3>Failed to load products</h3>
          <p>{error?.message || 'Something went wrong while fetching data.'}</p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}

      {/* Successful Response: isSuccess */}
      {isSuccess && products && (
        <>
          {products.length === 0 ? (
            <div className="empty-state">
              <p>No products found matching "{searchTerm}".</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="placeholder-image">📦</div>
                    )}
                    {product.category && (
                      <span className="category-tag">{product.category}</span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

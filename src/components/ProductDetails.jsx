import { AddToCartButton } from './AddToCartButton'

export function ProductDetails({ product, onBack, onAddToCart }) {
  if (!product) {
    return null
  }

  return (
    <section
      className="product-details-container"
      ref={(element) => {
        if (!element) return

        // Attach keydown listener to allow closing via Escape key
        const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            onBack()
          }
        }

        window.addEventListener('keydown', handleKeyDown)

        // Returning a cleanup function directly from the callback ref
        return () => {
          window.removeEventListener('keydown', handleKeyDown)
        }
      }}
    >
      <title>{`${product.name} – Mini Store`}</title>
      <meta name="description" content={product.description} />

      <div className="details-nav-bar">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-outline btn-sm back-btn"
        >
          ← Back to Products
        </button>
        <span className="breadcrumb">
          Store / {product.category} / <strong>{product.name}</strong>
        </span>
      </div>

      <div className="product-details-grid">
        <div className="details-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="details-img"
          />
          <span className="category-pill">{product.category}</span>
        </div>

        <div className="details-info-panel">
          <h1 className="details-title">{product.name}</h1>

          <div className="details-rating-row">
            <span className="rating-badge">⭐ {product.rating} / 5.0</span>
            <span className="stock-badge in-stock">
              ● In Stock ({product.stock} units available)
            </span>
          </div>

          <div className="details-price-tag">
            <span className="currency">₹</span>
            <span className="amount">{product.price.toFixed(2)}</span>
          </div>

          <div className="details-section">
            <h3 className="section-label">Product Overview</h3>
            <p className="details-description">{product.description}</p>
          </div>

          <div className="details-specs">
            <div className="spec-item">
              <span className="spec-key">Category:</span>
              <span className="spec-val">{product.category}</span>
            </div>
            <div className="spec-item">
              <span className="spec-key">Product ID:</span>
              <span className="spec-val">{product.id}</span>
            </div>
            <div className="spec-item">
              <span className="spec-key">Shipping:</span>
              <span className="spec-val">Free Standard Delivery</span>
            </div>
          </div>

          <div className="details-cta-box">
            <AddToCartButton
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

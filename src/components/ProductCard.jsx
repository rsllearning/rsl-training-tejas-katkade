import { AddToCartButton } from './AddToCartButton'

/**
 * ProductCard displays product preview information:
 * - Product Name
 * - Price
 * - Category
 * - Product Image
 * - Short Description
 */
export function ProductCard({ product, onSelectProduct, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card-media" onClick={() => onSelectProduct(product)}>
        <span className="product-category-tag">{product.category}</span>
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title" onClick={() => onSelectProduct(product)}>
          {product.name}
        </h3>

        <p className="product-card-desc">{product.shortDescription}</p>

        <div className="product-card-meta">
          <div className="product-price">
            ₹{product.price.toFixed(2)}
          </div>
          <div className="product-rating">
            ⭐ {product.rating}
          </div>
        </div>

        <div className="product-card-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onSelectProduct(product)}
          >
            View Details
          </button>

          <AddToCartButton
            product={product}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </article>
  )
}

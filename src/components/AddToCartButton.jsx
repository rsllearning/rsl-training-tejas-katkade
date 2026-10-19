import { useState } from 'react'

export function AddToCartButton({ product, onAddToCart, disabled = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = async () => {
    if (disabled || isSubmitting) return
    setIsSubmitting(true)
    try {
      await onAddToCart(product)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isSubmitting}
      className={`btn btn-accent add-to-cart-btn ${isSubmitting ? 'btn-optimistic-loading' : ''}`}
      aria-label={`Add ${product.name} to cart`}
    >
      {isSubmitting ? (
        <span className="btn-spinner-content">
          <span className="mini-spinner" aria-hidden="true" />
          Adding...
        </span>
      ) : (
        <span>🛒 Add to Cart</span>
      )}
    </button>
  )
}

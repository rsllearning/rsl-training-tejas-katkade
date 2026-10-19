export function CartView({
  cartItems: _cartItems,
  optimisticCart,
  isCartPending,
  onClearCart,
  onBackToProducts,
}) {
  const displayItems = optimisticCart
  const subtotal = displayItems.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className="cart-view-container">
      <title>Shopping Cart – Mini Store</title>
      <meta name="description" content="Review items in your Mini Store shopping cart." />

      <div className="cart-header-row">
        <h2>Shopping Cart</h2>
        <button
          type="button"
          onClick={onBackToProducts}
          className="btn btn-outline btn-sm"
        >
          ← Continue Shopping
        </button>
      </div>

      {displayItems.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <button
            type="button"
            onClick={onBackToProducts}
            className="btn btn-primary"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content-grid">
          <div className="cart-items-list">
            {displayItems.map((item, index) => (
              <div
                key={item.cartItemId || index}
                className="cart-item-card"
              >
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <span className="cart-item-category">{item.category}</span>
                  <div className="cart-item-price">₹{item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items ({displayItems.length}):</span>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free-shipping">FREE</span>
            </div>
            <hr className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block checkout-btn"
              disabled={isCartPending}
              onClick={() => alert('Proceeding to checkout with ' + displayItems.length + ' item(s)!')}
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              className="btn btn-outline btn-block btn-sm"
              onClick={onClearCart}
              disabled={isCartPending}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

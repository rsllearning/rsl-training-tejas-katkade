import { useUser } from '../context/useUser'

/**
 * Header component displaying branding, navigation, user profile, and cart count.
 */
export function Header({
  activeView,
  onNavigate,
  cartCount,
  isCartPending,
}) {
  const { user, logout } = useUser()

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-group" onClick={() => onNavigate('products')}>
          <span className="brand-logo" role="img" aria-label="cart">🛒</span>
          <span className="brand-name">Mini Store</span>
        </div>

        <nav className="header-nav" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-tab ${activeView === 'products' ? 'active-tab' : ''}`}
            onClick={() => onNavigate('products')}
          >
            Products
          </button>

          {!user && (
            <button
              type="button"
              className={`nav-tab ${activeView === 'register' ? 'active-tab' : ''}`}
              onClick={() => onNavigate('register')}
            >
              Register
            </button>
          )}
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-profile-badge">
              <span className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="user-greeting">Hi, {user.name}</span>
              <button
                type="button"
                onClick={logout}
                className="btn-logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => onNavigate('register')}
            >
              Sign In
            </button>
          )}

          <div
            className={`cart-indicator ${isCartPending ? 'cart-indicator-pending' : ''}`}
            onClick={() => onNavigate('cart')}
            title="View Cart"
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-label">Cart</span>
            <span className="cart-count-badge">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

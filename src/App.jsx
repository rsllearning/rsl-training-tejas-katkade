import { Suspense, useOptimistic, useRef, useState, useTransition } from 'react'
import { preconnect, prefetchDNS, preload } from 'react-dom'
import { CartView } from './components/CartView'
import { CustomInput } from './components/CustomInput'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { ProductDetails } from './components/ProductDetails'
import { ProductList, ProductListSkeleton } from './components/ProductList'
import { RegistrationForm } from './components/RegistrationForm'
import { apiAddToCart, fetchProducts } from './data/mockProducts'

preconnect('https://images.unsplash.com', { crossOrigin: 'anonymous' })
prefetchDNS('https://images.unsplash.com')
preload(
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  { as: 'image' }
)

export function App() {
  const [activeView, setActiveView] = useState('products')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const searchInputRef = useRef(null)

  const [productsPromise, setProductsPromise] = useState(() => fetchProducts())

  const [cartItems, setCartItems] = useState([])
  const [cartNotification, setCartNotification] = useState(null)
  const [isCartPending, startTransition] = useTransition()

  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartItems,
    (currentItems, pendingItem) => [...currentItems, pendingItem]
  )

  const handleAddToCart = async (product) => {
    startTransition(async () => {
      const tempItem = {
        ...product,
        cartItemId: 'temp-' + Date.now(),
        isOptimistic: true,
      }
      setOptimisticCart(tempItem)

      try {
        await apiAddToCart(product, { delayMs: 1000 })
        setCartItems((prev) => [
          ...prev,
          {
            ...product,
            cartItemId: 'item-' + Date.now(),
            isOptimistic: false,
          },
        ])
        setCartNotification({
          type: 'success',
          text: `Added "${product.name}" to cart.`,
        })
      } catch (err) {
        setCartNotification({
          type: 'error',
          text: err.message || `Could not add "${product.name}" to cart.`,
        })
      }
    })
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setActiveView('details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearCart = () => {
    setCartItems([])
    setCartNotification(null)
  }

  return (
    <div className="app-layout">
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        cartCount={optimisticCart.length}
        isCartPending={isCartPending}
      />

      {cartNotification && (
        <aside
          className={`cart-toast ${cartNotification.type === 'error' ? 'toast-error' : 'toast-success'}`}
          role="status"
        >
          <span>{cartNotification.text}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setCartNotification(null)}
          >
            ✕
          </button>
        </aside>
      )}

      <main className="main-content">
        {activeView === 'products' && (
          <section className="products-view">
            <title>Mini Store – Products</title>
            <meta
              name="description"
              content="Browse our selection of quality products at Mini Store."
            />

            <div className="products-view-header">
              <div>
                <h1 className="page-heading">Products</h1>
                <p className="page-subheading">
                  Explore our collection of electronics and accessories.
                </p>
              </div>

              <div className="filter-search-row">
                <div className="search-input-wrapper">
                  <CustomInput
                    ref={searchInputRef}
                    id="search-products-input"
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      onClick={handleClearSearch}
                      title="Clear search and focus input"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="category-filter-wrapper">
                  <select
                    className="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filter by category"
                  >
                    <option value="All">All Categories</option>
                    <option value="Audio">Audio</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Computers">Computers</option>
                  </select>
                </div>
              </div>
            </div>

            <ErrorBoundary
              onReset={() => setProductsPromise(fetchProducts({ delayMs: 800 }))}
            >
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList
                  productsPromise={productsPromise}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  onSelectProduct={handleSelectProduct}
                  onAddToCart={handleAddToCart}
                />
              </Suspense>
            </ErrorBoundary>
          </section>
        )}

        {activeView === 'details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setActiveView('products')}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'register' && (
          <RegistrationForm
            onRegistrationSuccess={() => {
              setActiveView('products')
            }}
          />
        )}

        {activeView === 'cart' && (
          <CartView
            cartItems={cartItems}
            optimisticCart={optimisticCart}
            isCartPending={isCartPending}
            onClearCart={handleClearCart}
            onBackToProducts={() => setActiveView('products')}
          />
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-container">
          <p className="footer-credits">
            &copy; 2026 Mini Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ProductList } from './components/ProductList'
import { UserForm } from './components/UserForm'
import { UserList } from './components/UserList'

// Create a single QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
})

export function App() {
  const [activeTab, setActiveTab] = useState('products')

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        {/* Navigation Bar */}
        <header className="app-header">
          <div className="header-inner">
            <div className="brand">
              <span className="brand-icon">⚡</span>
              <h1 className="brand-title">TanStack Query Assignment</h1>
            </div>

            <nav className="tab-nav" aria-label="Exercise Navigation">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {activeTab === 'products' && <ProductList />}

          {activeTab === 'users' && (
            <section className="section-container">
              <div className="user-management-grid">
                <div className="user-form-column">
                  <UserForm />
                </div>
                <div className="user-list-column">
                  <UserList />
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; 2026 TanStack Query Assignment</p>
        </footer>
      </div>

      {/* TanStack Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

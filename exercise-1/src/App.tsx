import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { mockProducts } from './data/mockProducts';
import type { Product } from './types';

export function App() {
  const [products] = useState<Product[]>(mockProducts);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (product: Product) => {
    setToastMessage(`Added "${product.name}" to order.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleHeaderAction = () => {
    setToastMessage('New product creation dialog opened.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-brandBg-main flex flex-col md:flex-row text-brandText-primary font-sans antialiased">
      {/* Responsive Navigation/Sidebar adapts between mobile and desktop */}
      <Sidebar activeTab="products" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header with Title and Action Button */}
        <Header
          title="Product Catalog & Inventory"
          subtitle="Manage catalog items, pricing, and stock availability"
          actionLabel="Add New Product"
          onActionClick={handleHeaderAction}
        />

        {/* Dashboard Main View Container */}
        <main className="p-4 md:p-8 space-y-6 flex-1">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm rounded-tokenBtn flex items-center justify-between shadow-sm animate-fade-in">
              <span>{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-emerald-700 font-bold hover:text-emerald-900 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Responsive Product Grid */}
          <ProductGrid products={products} onAction={handleAction} />
        </main>
      </div>
    </div>
  );
}

export default App;

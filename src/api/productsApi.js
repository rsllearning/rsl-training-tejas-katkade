// Fallback initial products in case network is disconnected
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Wireless Headphones',
    description: 'High-fidelity audio with active noise cancellation and long battery life.',
    price: 199.99,
    category: 'audio',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with hot-swappable tactile switches.',
    price: 129.50,
    category: 'peripherals',
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    title: 'Smart Fitness Watch',
    description: 'Track workouts, heart rate, and sleep quality with AMOLED display.',
    price: 249.00,
    category: 'wearables',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    title: 'Ergonomic Vertical Mouse',
    description: 'Natural handshake angle designed to reduce wrist strain and fatigue.',
    price: 59.99,
    category: 'peripherals',
    thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80',
  },
]

/**
 * Fetch products from REST API (DummyJSON with fallback support)
 */
export async function fetchProducts(searchTerm = '') {
  // Simulate network latency so loading states (isPending / isFetching) are visible
  await new Promise((resolve) => setTimeout(resolve, 600))

  try {
    const url = searchTerm.trim()
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm.trim())}`
      : 'https://dummyjson.com/products?limit=12'

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`)
    }
    const data = await response.json()
    return data.products || []
  } catch {
    const term = searchTerm.toLowerCase().trim()
    return FALLBACK_PRODUCTS.filter(
      (p) => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    )
  }
}

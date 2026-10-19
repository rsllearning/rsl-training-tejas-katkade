export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    description: 'Experience studio-grade sound with industry-leading noise cancellation technology. Featuring comfortable plush earcups, touch controls, voice assistant integration, and high-resolution audio codecs for pristine sound reproduction on the go.',
    rating: 4.8,
    stock: 15,
  },
  {
    id: 'prod-2',
    name: 'Mechanical Gaming Keyboard',
    price: 129.50,
    category: 'Peripherals',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Tactile RGB mechanical keyboard with swappable switches and aircraft-grade aluminum frame.',
    description: 'Designed for esports enthusiasts and programmers alike. Equipped with hot-swappable mechanical switches, per-key RGB backlighting, braided USB-C cable, and sound-dampening foam for an unmatched typing experience.',
    rating: 4.7,
    stock: 8,
  },
  {
    id: 'prod-3',
    name: 'Smart Fitness Watch V2',
    price: 249.00,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Track workouts, heart rate, sleep quality, and GPS routes with always-on AMOLED display.',
    description: 'Stay connected and monitor health 24/7. Includes advanced ECG tracking, 50m water resistance, 7-day battery endurance, and seamless smartphone notifications for Android and iOS.',
    rating: 4.6,
    stock: 20,
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Vertical Mouse',
    price: 59.99,
    category: 'Peripherals',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Natural handshake angle designed to reduce wrist strain and forearm muscle fatigue.',
    description: 'Promote healthy wrist posture during long workdays. Features dual wireless connectivity (Bluetooth + 2.4GHz), precision optical sensor up to 4000 DPI, and whisper-quiet click buttons.',
    rating: 4.5,
    stock: 25,
  },
  {
    id: 'prod-5',
    name: 'Portable 4K Ultra-HD Monitor',
    price: 319.99,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    shortDescription: '15.6-inch IPS external display with dual USB-C, HDMI, and built-in stereo speakers.',
    description: 'Boost mobile productivity anywhere. Weighing only 750g, this lightweight monitor features 100% sRGB color gamut, HDR support, eye-care anti-glare coating, and magnetic protective stand case.',
    rating: 4.9,
    stock: 6,
  },
  {
    id: 'prod-6',
    name: 'Studio Condenser USB Microphone',
    price: 89.00,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Broadcast-quality cardioid USB microphone with tap-to-mute sensor and shock mount.',
    description: 'Perfect for podcasting, streaming, video conferencing, and vocal recording. Plug-and-play with zero-latency headphone monitoring, gain dial control, and included pop filter.',
    rating: 4.6,
    stock: 12,
  },
]

// Simulate asynchronous API request to fetch products using Promise
export function fetchProducts({ shouldFail = false, delayMs = 1000 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to load products from server. Please check your network and retry.'))
      } else {
        // Return deep copy so consumers don't mutate original
        resolve([...INITIAL_PRODUCTS])
      }
    }, delayMs)
  })
}

// Simulate Add to Cart API with optional failure
export function apiAddToCart(product, { shouldFail = false, delayMs = 1200 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Server failed to add "${product.name}" to cart. Order quota exceeded.`))
      } else {
        resolve({
          success: true,
          item: product,
          timestamp: new Date().toISOString(),
        })
      }
    }, delayMs)
  })
}

// Simulate User Registration API
export function apiRegister(userData, { shouldFail = false, delayMs = 1200 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Server error: An account with this email address already exists.'))
      } else {
        resolve({
          success: true,
          user: {
            id: 'usr_' + Date.now(),
            name: userData.name,
            email: userData.email,
            registeredAt: new Date().toLocaleDateString(),
          },
        })
      }
    }, delayMs)
  })
}

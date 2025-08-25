require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_ORIGIN }));

console.log('🚀 Starting Badsha Bangles Temporary Server...');
console.log('📊 Mode: Mock Data (No MongoDB required)');
console.log(`🌐 Frontend Origin: ${FRONTEND_ORIGIN}`);

// Mock jewelry products data
const mockProducts = [
  {
    _id: '1',
    title: 'Antique Ruby Gold Bangle',
    slug: 'antique-ruby-gold-bangle',
    description: 'Exquisite antique bangle crafted with ruby and gold, perfect for traditional occasions.',
    price: 8500,
    images: ['/products/bangles/antique-bangle-1.webp'],
    mainImage: '/products/bangles/antique-bangle-1.webp',
    colors: ['#FFD700', '#DC143C'],
    sizes: ['2.4', '2.6', '2.8'],
    stock: 15,
    category: 'bangles',
    categories: [{ key: 'bangles', name: 'Bangles' }],
    createdAt: new Date('2024-01-01')
  },
  {
    _id: '2',
    title: 'Kundan Designer Bangle',
    slug: 'kundan-designer-bangle',
    description: 'Beautiful kundan bangle with traditional design elements. Handcrafted with attention to detail.',
    price: 6500,
    images: ['/products/bangles/kundan-bangle-1.webp'],
    mainImage: '/products/bangles/kundan-bangle-1.webp',
    colors: ['#FFD700', '#FFFFFF'],
    sizes: ['2.4', '2.6', '2.8', '3.0'],
    stock: 20,
    category: 'bangles',
    categories: [{ key: 'bangles', name: 'Bangles' }],
    createdAt: new Date('2024-01-02')
  },
  {
    _id: '3',
    title: 'Zircon White Gold Bangle',
    slug: 'zircon-white-gold-bangle',
    description: 'Modern zircon bangle with white gold finish. Perfect for contemporary styling.',
    price: 5800,
    images: ['/products/bangles/zircon-bangle-1.webp'],
    mainImage: '/products/bangles/zircon-bangle-1.webp',
    colors: ['#FFFFFF', '#C0C0C0'],
    sizes: ['2.4', '2.6', '2.8'],
    stock: 18,
    category: 'bangles',
    categories: [{ key: 'bangles', name: 'Bangles' }],
    createdAt: new Date('2024-01-03')
  },
  {
    _id: '4',
    title: 'Antique Ruby Gold Earrings',
    slug: 'antique-ruby-gold-earrings',
    description: 'Classic antique earrings with ruby and gold detailing. Traditional design for special occasions.',
    price: 4500,
    images: ['/products/earrings/antique-earring-1.webp'],
    mainImage: '/products/earrings/antique-earring-1.webp',
    colors: ['#FFD700', '#DC143C'],
    sizes: ['One Size'],
    stock: 25,
    category: 'earrings',
    categories: [{ key: 'earrings', name: 'Earrings' }],
    createdAt: new Date('2024-01-04')
  },
  {
    _id: '5',
    title: '92.5 Silver Earrings',
    slug: '925-silver-earrings',
    description: 'Premium 92.5 silver earrings with contemporary design. Lightweight and comfortable.',
    price: 2800,
    images: ['/products/earrings/silver-earring-1.webp'],
    mainImage: '/products/earrings/silver-earring-1.webp',
    colors: ['#C0C0C0', '#FFFFFF'],
    sizes: ['One Size'],
    stock: 30,
    category: 'earrings',
    categories: [{ key: 'earrings', name: 'Earrings' }],
    createdAt: new Date('2024-01-05')
  },
  {
    _id: '6',
    title: 'Trendy Pearl Gold Earrings',
    slug: 'trendy-pearl-gold-earrings',
    description: 'Modern trendy earrings with pearl and gold combination. Perfect for daily wear.',
    price: 3200,
    images: ['/products/earrings/trendy-earring-1.webp'],
    mainImage: '/products/earrings/trendy-earring-1.webp',
    colors: ['#FFD700', '#FFFFFF'],
    sizes: ['One Size'],
    stock: 28,
    category: 'earrings',
    categories: [{ key: 'earrings', name: 'Earrings' }],
    createdAt: new Date('2024-01-06')
  },
  {
    _id: '7',
    title: 'Antique Ruby Green Gold Necklace',
    slug: 'antique-ruby-green-gold-necklace',
    description: 'Magnificent antique necklace with ruby and emerald stones in gold setting.',
    price: 12500,
    images: ['/products/necklaces/antique-necklace-1.jpg'],
    mainImage: '/products/necklaces/antique-necklace-1.jpg',
    colors: ['#FFD700', '#DC143C', '#50C878'],
    sizes: ['16 inch', '18 inch', '20 inch'],
    stock: 8,
    category: 'necklaces',
    categories: [{ key: 'necklaces', name: 'Necklaces' }],
    createdAt: new Date('2024-01-07')
  },
  {
    _id: '8',
    title: 'Kundan Victorian Necklace',
    slug: 'kundan-victorian-necklace',
    description: 'Elegant kundan necklace in Victorian style. Perfect for bridal and festive wear.',
    price: 9800,
    images: ['/products/necklaces/kundan-necklace-1.webp'],
    mainImage: '/products/necklaces/kundan-necklace-1.webp',
    colors: ['#FFD700', '#50C878'],
    sizes: ['16 inch', '18 inch'],
    stock: 10,
    category: 'necklaces',
    categories: [{ key: 'necklaces', name: 'Necklaces' }],
    createdAt: new Date('2024-01-08')
  },
  {
    _id: '9',
    title: '92.5 Silver Designer Necklace',
    slug: '925-silver-designer-necklace',
    description: 'Contemporary 92.5 silver necklace with modern design elements.',
    price: 6800,
    images: ['/products/necklaces/silver-necklace-1.webp'],
    mainImage: '/products/necklaces/silver-necklace-1.webp',
    colors: ['#C0C0C0'],
    sizes: ['16 inch', '18 inch', '20 inch'],
    stock: 15,
    category: 'necklaces',
    categories: [{ key: 'necklaces', name: 'Necklaces' }],
    createdAt: new Date('2024-01-09')
  },
  {
    _id: '10',
    title: 'Kundan Ivory Pink Ring',
    slug: 'kundan-ivory-pink-ring',
    description: 'Beautiful kundan finger ring with ivory and pink stone combination.',
    price: 3200,
    images: ['/products/rings/kundan-ring-1.webp'],
    mainImage: '/products/rings/kundan-ring-1.webp',
    colors: ['#FFFFF0', '#FFC0CB'],
    sizes: ['6', '7', '8', '9', '10'],
    stock: 20,
    category: 'rings',
    categories: [{ key: 'rings', name: 'Rings' }],
    createdAt: new Date('2024-01-10')
  }
];

const mockCategories = [
  { key: 'bangles', name: 'Bangles', image: '/categories/2.png' },
  { key: 'earrings', name: 'Earrings', image: '/categories/3.png' },
  { key: 'necklaces', name: 'Necklaces', image: '/categories/4.png' },
  { key: 'rings', name: 'Rings', image: '/categories/1.png' },
  { key: 'chains-pendants', name: 'Chains & Pendants', image: '/categories/5.png' },
  { key: 'mangalsutra', name: 'Mangalsutra', image: '/categories/6.png' },
  { key: 'bracelets-kada', name: 'Bracelets & Kada', image: '/categories/7.png' },
  { key: 'hair-accessories', name: 'Hair Accessories', image: '/categories/8.png' },
  { key: 'traditional', name: 'Traditional Jewelry', image: '/categories/9.png' }
];

// Products API
app.get('/api/products', (req, res) => {
  try {
    const { slug, q, category, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;
    
    // Handle single product by slug
    if (slug) {
      const product = mockProducts.find(p => p.slug === slug);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(product);
    }

    let filteredProducts = [...mockProducts];

    // Apply filters
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category === category || 
        p.categories.some(cat => cat.key === category)
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
    }

    // Apply sorting
    if (sort) {
      if (sort === 'price_asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sort === 'newest') {
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    console.log(`📊 API Request: Returning ${paginatedProducts.length} products (category: ${category || 'all'})`);

    res.json(paginatedProducts);
  } catch (err) {
    console.error('Products API error:', err);
    res.status(500).json({ error: 'server error' });
  }
});

// Categories API
app.get('/api/categories', (req, res) => {
  try {
    console.log('📁 Categories API: Returning all categories');
    res.json(mockCategories);
  } catch (err) {
    console.error('Categories API error:', err);
    res.status(500).json({ error: 'server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mode: 'mock-data',
    message: 'Temporary server running with mock jewelry data',
    timestamp: new Date().toISOString()
  });
});

app.get('/ping', (req, res) => res.json({ ok: true }));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`\\n🎉 Badsha Bangles Temporary Server Started!`);
  console.log(`🚀 Backend running on: http://localhost:${PORT}`);
  console.log(`📊 Products available: ${mockProducts.length}`);
  console.log(`📁 Categories available: ${mockCategories.length}`);
  console.log(`🌐 Frontend should connect to: ${FRONTEND_ORIGIN}`);
  console.log(`\\n✅ Your frontend will now show products!`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/products`);
  console.log(`\\n⚠️  Note: This is temporary mock data`);
  console.log(`🎯 For real database: Update Node.js to v20.x LTS`);
});
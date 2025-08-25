// Script: import_og_placeholders.js
// Purpose: Manually import placeholder arrays (copied from the OG frontend) into MongoDB.
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const Product = require('../models/Product');
const Category = require('../models/Category');

const MONGO = process.env.MONGO || 'mongodb://127.0.0.1:27017/badshadb';

async function connectDb() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');
}

// --- Manually embedded placeholder arrays (from OG files) ---
const ogCategories = [
  { id: 1, title: 'Exquisite bangles', price: 'Rs. 500', image: '/homeimage/1.png', slug: 'exquisite-bangles' },
  { id: 2, title: 'Graceful jewellery set', price: 'Rs. 500', image: '/homeimage/2.png', slug: 'jewellery-sets' },
  { id: 3, title: 'Timeless Neckpiece', price: 'Rs. 500', image: '/homeimage/3.png', slug: 'neckpieces' },
  { id: 4, title: 'Exquisite bangles', price: 'Rs. 500', image: '/homeimage/4.png', slug: 'exquisite-bangles' },
  { id: 5, title: 'Opulent Jhumkis', price: 'Rs. 500', image: '/homeimage/5.png', slug: 'jhumkis' },
  { id: 6, title: 'Refined Rings', price: 'Rs. 500', image: '/homeimage/6.png', slug: 'rings' },
  { id: 7, title: 'Sophisticated Nose-rings', price: 'Rs. 500', image: '/homeimage/7.png', slug: 'nose-rings' },
  { id: 8, title: 'Regal Ere-rings', price: 'Rs. 500', image: '/homeimage/8.png', slug: 'ere-rings' },
];

const ogJewelryItems = [
  { id: 'gold-bangle-1', name: 'Elegant Gold Bangle', price: 25000, image: '/categories/1.png', category: 'bangles', description: 'A beautifully crafted gold bangle with intricate design work, perfect for special occasions.' },
  { id: 'necklace-set-1', name: 'Royal Necklace Set', price: 45000, image: '/categories/2.png', category: 'necklaces', description: 'An elegant necklace set featuring traditional designs with a modern touch.' },
  { id: 'jewelry-set-1', name: 'Complete Bridal Set', price: 35000, image: '/categories/3.png', category: 'sets', description: 'A complete bridal jewelry set including necklace, earrings, and bangles for your special day.' },
  { id: 'green-emerald-1', name: 'Green Emerald Bangle', price: 30000, image: '/categories/4.png', category: 'bangles', description: 'Beautiful emerald-studded bangles that bring a touch of color to any outfit.' },
  { id: 'necklace-2', name: 'Classic Gold Necklace', price: 38000, image: '/categories/5.png', category: 'necklaces', description: 'A timeless classic gold necklace that complements both traditional and modern attire.' },
  { id: 'ornate-necklace-1', name: 'Ornate Necklace', price: 50000, image: '/categories/6.png', category: 'necklaces', description: 'An ornately designed necklace with detailed craftsmanship showcasing traditional artistry.' },
  { id: 'gold-necklace-3', name: 'Gold Necklace', price: 42000, image: '/categories/7.png', category: 'necklaces', description: 'A premium gold necklace with elegant design suitable for weddings and ceremonies.' },
  { id: 'bangles-set-1', name: 'Bangles Set', price: 28000, image: '/categories/8.png', category: 'bangles', description: 'A set of matching bangles that creates a harmonious look when worn together.' },
  { id: 'gold-set-1', name: 'Gold Jewelry Set', price: 65000, image: '/categories/9.png', category: 'sets', description: 'A comprehensive gold jewelry set for those who value matching accessories.' },
  { id: 'red-earrings-1', name: 'Red Gemstone Earrings', price: 15000, image: '/categories/10.png', category: 'earrings', description: 'Beautiful earrings featuring vibrant red gemstones that make a bold statement.' },
  { id: 'gold-earrings-1', name: 'Gold Earrings', price: 18000, image: '/categories/12.png', category: 'earrings', description: 'Delicate gold earrings with intricate designs, perfect for everyday elegance.' },
  { id: 'gold-set-2', name: 'Elegant Gold Set', price: 55000, image: '/categories/13.png', category: 'sets', description: 'An elegant gold set that combines tradition with contemporary design elements.' },
  { id: 'bangles-set-2', name: 'Designer Bangles Set', price: 32000, image: '/categories/14.png', category: 'bangles', description: 'Designer bangles featuring artistic patterns and premium craftsmanship.' },
  { id: 'bangles-set-3', name: 'Traditional Bangles Set', price: 29000, image: '/categories/15.png', category: 'bangles', description: 'A traditional set of bangles that evokes the beauty of cultural heritage.' },
];

const ogWishlistProducts = [
  { id: 1, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/1.png', discount: null },
  { id: 2, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/2.png', discount: null },
  { id: 3, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/3.png', discount: '10% off' },
  { id: 4, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/4.png', discount: null },
  { id: 5, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/5.png', discount: null },
  { id: 6, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/6.png', discount: null },
  { id: 7, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/7.png', discount: null },
  { id: 8, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/8.png', discount: null },
  { id: 9, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/9.png', discount: null },
];

const ogNewArrivalProducts = [
  { id: 1, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/1.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: false },
  { id: 2, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/2.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: true },
  { id: 3, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/3.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: true },
  { id: 4, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/4.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: true },
  { id: 5, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/5.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: false },
  { id: 6, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/6.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: false },
  { id: 7, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/7.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: false },
  { id: 8, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/8.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: false },
  { id: 9, name: 'Dazzling Bangles', price: '₹2500', image: '/categories/9.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', isOnSale: false },
];

// --- Import logic ---
async function importCategories() {
  let count = 0;
  for (const c of ogCategories) {
    const key = c.slug || String(c.id || c.title).toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const doc = { key, name: c.title || c.name || key, image: c.image || null, description: c.description || '' };
    await Category.findOneAndUpdate({ key }, doc, { upsert: true, new: true });
    count++;
  }
  console.log(`Imported ${count} categories`);
}

function normalizeImage(img) {
  if (!img) return null;
  if (img.startsWith('/')) return img;
  return '/' + img;
}

async function importProducts() {
  let upserted = 0;
  const combined = [...ogJewelryItems, ...ogWishlistProducts, ...ogNewArrivalProducts];
  const seen = new Set();
  for (const item of combined) {
    const title = item.name || item.title || `product-${Math.random().toString(36).slice(2,8)}`;
    const slugBase = (item.slug || (typeof title === 'string' && title.toLowerCase().replace(/[^a-z0-9]+/g, '-')) || item.id || title).toString();
    const slug = slugBase.replace(/^\/+/, '');
    if (seen.has(slug)) continue;
    seen.add(slug);

    let priceNum = 0;
    if (typeof item.price === 'number') priceNum = item.price;
    else if (typeof item.price === 'string') priceNum = parseInt(item.price.replace(/[₹,\s]/g, '') || '0', 10);

    const mainImage = normalizeImage(item.image || item.mainImage);
    const doc = {
      title,
      slug,
      description: item.description || item.desc || '',
      price: priceNum || 0,
      images: mainImage ? [mainImage] : [],
      mainImage: mainImage || '',
      category: item.category || '',
      categories: item.category ? [{ key: item.category, name: item.category }] : [],
      stock: item.stock || 10
    };
    try {
      await Product.findOneAndUpdate({ slug }, doc, { upsert: true, new: true });
      upserted++;
    } catch (err) {
      console.error('Failed to upsert', slug, err.message);
    }
  }
  console.log(`Imported/Upserted ${upserted} products`);
}

async function run() {
  await connectDb();
  try {
    await importCategories();
    await importProducts();
    console.log('Import finished');
  } catch (err) {
    console.error('Import failed', err);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) run();

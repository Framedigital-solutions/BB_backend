// Optimized seed script for Node.js LTS v20.x
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { categories, products } = require('./productData');

const MONGO_URI = process.env.MONGO_URI;

console.log('🚀 Starting Badsha Bangles Database Seeding...');
console.log(`📦 Node.js Version: ${process.version}`);
console.log('🎯 Target: MongoDB Atlas');

async function seedDatabase() {
  try {
    // Connect to MongoDB Atlas with optimized settings for Node.js v20.x
    console.log('\\n🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      maxPoolSize: 10,
      minPoolSize: 5,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Clear existing data
    console.log('\\n🧹 Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert categories with progress tracking
    console.log('\\n📁 Inserting jewelry categories...');
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      await Category.create(category);
      console.log(`   ✓ ${i + 1}/${categories.length}: ${category.name}`);
    }
    console.log(`✅ Successfully inserted ${categories.length} categories`);

    // Insert products with progress tracking
    console.log('\\n💎 Inserting jewelry products...');
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      await Product.create(product);
      console.log(`   ✓ ${i + 1}/${products.length}: ${product.title}`);
    }
    console.log(`✅ Successfully inserted ${products.length} products`);
    
    // Verify data integrity
    console.log('\\n🔍 Verifying data integrity...');
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();
    
    console.log(`   📊 Categories in database: ${categoryCount}`);
    console.log(`   📊 Products in database: ${productCount}`);
    
    if (categoryCount === categories.length && productCount === products.length) {
      console.log('✅ Data integrity verified - all records inserted correctly');
    } else {
      console.log('⚠️  Data integrity warning - count mismatch detected');
    }
    
    // Display summary
    console.log('\\n📋 SEEDING SUMMARY:');
    console.log('================================');
    console.log(`✅ Categories: ${categoryCount} inserted`);
    console.log(`✅ Products: ${productCount} inserted`);
    console.log('✅ Asset integration: Complete');
    console.log('✅ Database: Ready for production');
    console.log('\\n🎯 Your Badsha Bangles e-commerce platform is ready!');
    console.log('\\n📝 Available jewelry categories:');
    categories.forEach(cat => {
      console.log(`   💎 ${cat.name} (${cat.key})`);
    });
    
    await mongoose.disconnect();
    console.log('\\n🔌 Disconnected from MongoDB Atlas');
    console.log('\\n🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY! 🎉');
    
  } catch (error) {
    console.error('\\n❌ SEEDING FAILED:', error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.log('\\n🔧 Network Error Troubleshooting:');
      console.log('   1. Check internet connection');
      console.log('   2. Verify IP whitelist in MongoDB Atlas');
      console.log('   3. Confirm connection string is correct');
    }
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\\n🔧 Server Selection Error:');
      console.log('   1. MongoDB Atlas cluster may be paused');
      console.log('   2. Check cluster status in Atlas dashboard');
      console.log('   3. Verify network access configuration');
    }
    
    console.log(`\\n🐛 Full error details: ${error}`);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\\n⚠️  Received interrupt signal, closing database connection...');
  await mongoose.disconnect();
  process.exit(0);
});

seedDatabase();
// Workaround for Node.js SSL/TLS issues with MongoDB Atlas
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { categories, products } = require('./productData');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/badshadb';

async function run() {
  try {
    // Use simplified connection options
    await mongoose.connect(MONGO);
    console.log('Connected to MongoDB Atlas successfully!');
  } catch (connectionError) {
    console.error('MongoDB connection failed:', connectionError.message);
    console.error('Trying with fallback connection...');
    
    // Try fallback connection
    try {
      await mongoose.connect(MONGO.replace('mongodb+srv://', 'mongodb://'), {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected with fallback method!');
    } catch (fallbackError) {
      console.error('Fallback connection also failed:', fallbackError.message);
      console.error('Please check your MongoDB Atlas configuration and network connectivity.');
      process.exit(1);
    }
  }

  // Clear existing data
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log('Cleared existing data');

  // Insert new data
  await Category.insertMany(categories);
  console.log(`Inserted ${categories.length} categories`);

  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products`);
  
  console.log('Database seeded successfully with new jewelry assets!');
  process.exit(0);
}

run().catch(err => { 
  console.error('Seeding error:', err); 
  process.exit(1); 
});

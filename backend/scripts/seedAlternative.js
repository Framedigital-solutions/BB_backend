// Alternative seed script with SSL workaround
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { categories, products } = require('./productData');

const MONGO_URI = process.env.MONGO_URI;

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected successfully!');

    const db = client.db('badshadb');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert categories
    console.log('Inserting categories...');
    await db.collection('categories').insertMany(categories);
    console.log(`✅ Inserted ${categories.length} categories`);

    // Insert products
    console.log('Inserting products...');
    await db.collection('products').insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);

    console.log('\\n🎉 Database seeded successfully with jewelry assets!');
    console.log('\\n📊 Summary:');
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Products: ${products.length}`);
    console.log('   Asset categories: Bangles, Earrings, Necklaces, Rings, Chains & Pendants, Mangalsutra, Bracelets & Kada, Hair Accessories, Traditional');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    
    if (error.message.includes('authentication')) {
      console.log('\\n🔧 Authentication issue detected. Please verify:');
      console.log('1. Username and password are correct');
      console.log('2. Database user has read/write permissions');
      console.log('3. IP address is whitelisted in MongoDB Atlas');
    }
  } finally {
    await client.close();
    console.log('\\n🔌 Connection closed');
  }
}

seedDatabase().catch(console.error);
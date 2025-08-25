// Direct MongoDB connection test for Node.js v21.x
require('dotenv').config();

async function testDirectConnection() {
  console.log('🔧 Testing direct MongoDB connection...');
  console.log(`📊 Node.js version: ${process.version}`);
  
  const MONGO_URI = process.env.MONGO_URI;
  console.log('🔗 Connection URI (masked):', MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
  
  try {
    // Try using native mongodb driver
    const { MongoClient } = require('mongodb');
    
    console.log('\n🚀 Attempting connection with basic options...');
    const client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    await client.connect();
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // Test database operations
    const db = client.db('badshadb');
    const collections = await db.listCollections().toArray();
    console.log(`📁 Available collections: ${collections.length}`);
    
    // Test inserting a document
    const testCollection = db.collection('connection_test');
    const testDoc = { 
      test: 'direct-connection',
      timestamp: new Date(),
      nodeVersion: process.version
    };
    
    await testCollection.insertOne(testDoc);
    console.log('✅ Insert test: PASSED');
    
    const count = await testCollection.countDocuments({ test: 'direct-connection' });
    console.log(`✅ Count test: PASSED (${count} documents)`);
    
    await testCollection.deleteMany({ test: 'direct-connection' });
    console.log('✅ Delete test: PASSED');
    
    await client.close();
    console.log('\n🎉 MongoDB Atlas connection is working!');
    console.log('🔄 Next step: Start backend server with database connection');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\n🔧 SSL/TLS Error - Node.js v21.x compatibility issue detected');
      console.log('📋 Solutions:');
      console.log('  1. 🏆 RECOMMENDED: Update to Node.js LTS v20.x');
      console.log('     Download: https://nodejs.org/');
      console.log('  2. 🔧 WORKAROUND: Use connection with SSL disabled');
      
      // Try workaround
      console.log('\n🔄 Attempting SSL workaround...');
      return await trySSLWorkaround();
    }
    
    return false;
  }
}

async function trySSLWorkaround() {
  try {
    // Set environment variable to disable SSL verification
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    const { MongoClient } = require('mongodb');
    const MONGO_URI = process.env.MONGO_URI;
    
    const client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      tls: false,
      ssl: false,
    });
    
    await client.connect();
    console.log('✅ WORKAROUND SUCCESS: Connected with SSL disabled!');
    
    await client.close();
    console.log('⚠️  WARNING: SSL disabled - only for development!');
    return true;
    
  } catch (workaroundError) {
    console.error('❌ Workaround also failed:', workaroundError.message);
    console.log('\n🚨 REQUIRED ACTION: Update Node.js to LTS v20.x');
    console.log('   Current version causes SSL incompatibility with MongoDB Atlas');
    return false;
  }
}

testDirectConnection();
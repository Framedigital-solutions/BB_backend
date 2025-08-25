// Enhanced MongoDB Atlas connection test for Node.js v22
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

console.log('🔧 Enhanced MongoDB Atlas Connection Test');
console.log(`📊 Node.js version: ${process.version}`);
console.log('🔗 Connection URI (masked):', MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

async function testAtlasConnection() {
  try {
    console.log('\n🚀 Attempting enhanced connection with modern options...');
    
    // Use modern connection options for Node.js v22
    await mongoose.connect(MONGO_URI, {
      // Use new URL parser
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      // Connection timeout settings
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      
      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 1,
      
      // MongoDB driver options for better compatibility
      family: 4, // Use IPv4, skip trying IPv6
      
      // Disable deprecated warnings
      bufferMaxEntries: 0,
      bufferCommands: false,
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // Test database operations
    console.log('\n🧪 Testing database operations...');
    const db = mongoose.connection.db;
    
    // Test collection listing
    const collections = await db.listCollections().toArray();
    console.log(`📁 Available collections: ${collections.length}`);
    
    // Test inserting a document
    const testCollection = db.collection('connection_test');
    const testDoc = { 
      test: 'enhanced-connection',
      timestamp: new Date(),
      nodeVersion: process.version,
      mongooseVersion: mongoose.version
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ Insert test: PASSED');
    console.log(`   Document ID: ${insertResult.insertedId}`);
    
    const count = await testCollection.countDocuments({ test: 'enhanced-connection' });
    console.log(`✅ Count test: PASSED (${count} documents)`);
    
    // Clean up test data
    await testCollection.deleteMany({ test: 'enhanced-connection' });
    console.log('✅ Delete test: PASSED');
    
    await mongoose.disconnect();
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('🎯 MongoDB Atlas connection is working perfectly!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Run seed script to populate database');
    console.log('   2. Start backend with real MongoDB data');
    console.log('   3. Switch from temporary to production server');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    // Detailed error analysis
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\n🔧 SSL/TLS Error Analysis:');
      console.log('   • This may be a network or firewall issue');
      console.log('   • Your Node.js version should be compatible');
      console.log('   • Try connecting from a different network');
    }
    
    if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 Network Error Analysis:');
      console.log('   • Check internet connection');
      console.log('   • Verify IP whitelist in MongoDB Atlas');
      console.log('   • Ensure cluster is not paused');
      console.log('   • Try from different network/VPN');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n🔧 Authentication Error Analysis:');
      console.log('   • Verify username and password');
      console.log('   • Check database user permissions');
      console.log('   • Ensure user has read/write access');
    }
    
    console.log('\n💡 Alternative Solutions:');
    console.log('   1. ✅ Current: Temporary server with mock data (working)');
    console.log('   2. 🔧 Try: Different MongoDB Atlas region');
    console.log('   3. 🔧 Try: MongoDB Compass for manual import');
    console.log('   4. 🔧 Try: Local MongoDB installation');
    
    return false;
  }
}

testAtlasConnection();
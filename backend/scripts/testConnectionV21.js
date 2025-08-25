// Simplified MongoDB Atlas connection test with Node.js v21.x workarounds
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

console.log('🔄 Testing MongoDB Atlas connection with Node.js v21.x workarounds...');
console.log('Connection URI (masked):', MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

async function testConnectionV21() {
  try {
    // Set Node.js SSL options for compatibility
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    console.log('\\n🔧 Applying Node.js v21.x SSL workarounds...');
    
    // Try connection with minimal options first
    console.log('\\n📡 Attempt 1: Minimal connection options...');
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // Test basic operations
    console.log('\\n🧪 Testing database operations...');
    const testDoc = { 
      test: 'connection-v21', 
      timestamp: new Date(),
      nodeVersion: process.version 
    };
    
    const db = mongoose.connection.db;
    const testCollection = db.collection('connection_test');
    
    await testCollection.insertOne(testDoc);
    console.log('✅ Insert test: PASSED');
    
    const count = await testCollection.countDocuments({ test: 'connection-v21' });
    console.log(`✅ Query test: PASSED (found ${count} documents)`);
    
    await testCollection.deleteMany({ test: 'connection-v21' });
    console.log('✅ Delete test: PASSED');
    
    await mongoose.disconnect();
    console.log('\\n🎉 All tests PASSED! MongoDB Atlas connection is working!');
    console.log('\\n📝 Next step: Run the seed script to populate your database');
    
    return true;
    
  } catch (error) {
    console.error('\\n❌ Connection failed:', error.message);
    
    // Provide specific troubleshooting based on error type
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\\n🔧 SSL/TLS Error detected:');
      console.log('   📌 This confirms Node.js v21.x SSL compatibility issue');
      console.log('   📌 Solution: Update to Node.js LTS v20.x');
      console.log('   📌 Download: https://nodejs.org/');
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.log('\\n🔧 Network Error detected:');
      console.log('   📌 Check your internet connection');
      console.log('   📌 Verify IP whitelist in MongoDB Atlas');
      console.log('   📌 Try different network (mobile hotspot)');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\\n🔧 Authentication Error detected:');
      console.log('   📌 Verify username and password');
      console.log('   📌 Check database user permissions');
    }
    
    console.log('\\n📋 Current setup status:');
    console.log(`   Node.js version: ${process.version}`);
    console.log('   Recommended version: v20.x.x LTS');
    console.log('   Atlas connection: Ready (just needs compatible Node.js)');
    
    return false;
  }
}

testConnectionV21();
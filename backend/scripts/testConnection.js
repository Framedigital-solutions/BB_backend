// Test MongoDB Atlas connection
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
console.log('Testing connection to MongoDB Atlas...');
console.log('Connection string (masked):', MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

async function testConnection() {
  try {
    // Try different connection approaches
    console.log('\\nAttempt 1: Basic connection...');
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test basic database operations
    console.log('\\nTesting database operations...');
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Successfully inserted test document!');
    
    const count = await testCollection.countDocuments();
    console.log(`✅ Database contains ${count} documents in test collection`);
    
    // Clean up test
    await testCollection.deleteMany({ test: 'connection' });
    console.log('✅ Cleaned up test documents');
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('\\n🔧 This appears to be an SSL/TLS issue. Suggestions:');
      console.log('1. Update Node.js to the latest LTS version');
      console.log('2. Try connecting from a different network');
      console.log('3. Check MongoDB Atlas network access settings');
      console.log('4. Verify your IP address is whitelisted');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\\n🔧 This appears to be an authentication issue. Suggestions:');
      console.log('1. Verify your username and password');
      console.log('2. Check if the database user has proper permissions');
    }
    
    process.exit(1);
  }
}

testConnection();
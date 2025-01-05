const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create indexes after connection
    await createIndexes();

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// Function to create indexes
const createIndexes = async () => {
  try {
    const db = mongoose.connection;
    
    // Create product indexes
    await db.collection('products').createIndexes([
      { key: { name: 'text', description: 'text' } },
      { key: { name: 1, price: -1 } }
    ]);

    // Add other collection indexes here if needed
    
  } catch (error) {
    console.error(`Error creating indexes: ${error.message}`.red);
  }
};

module.exports = connectDB; 
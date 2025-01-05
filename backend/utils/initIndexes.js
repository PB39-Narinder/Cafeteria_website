const mongoose = require('mongoose');
require('colors');

const initIndexes = async () => {
  try {
    const db = mongoose.connection;
    
    console.log('Creating indexes...'.yellow);

    // Drop existing indexes
    await db.collection('products').dropIndexes();

    // Create new indexes
    await db.collection('products').createIndexes([
      { 
        key: { name: 'text', description: 'text' },
        name: 'products_text_search'
      },
      { 
        key: { name: 1, price: -1 },
        name: 'products_name_price'
      }
    ]);

    console.log('Indexes created successfully'.green);
  } catch (error) {
    console.error(`Error initializing indexes: ${error.message}`.red);
  }
};

module.exports = initIndexes; 
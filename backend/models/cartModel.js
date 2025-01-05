import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: function(v) {
        return v <= this.countInStock;
      },
      message: 'Quantity cannot exceed items in stock'
    }
  },
});

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    cartItems: [cartItemSchema],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: String,
  },
  {
    timestamps: true,
  }
);

// Add middleware to handle cart updates
cartSchema.pre('save', async function(next) {
  // Remove any cart items where product no longer exists
  this.cartItems = this.cartItems.filter(item => item.product != null);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart; 
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdminSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Add method to handle cart operations
userSchema.methods.addToCart = async function(productId, qty) {
  const existingItem = this.cartItems.find(
    item => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.qty = qty;
  } else {
    this.cartItems.push({ product: productId, qty });
  }

  return this.save();
};

userSchema.methods.removeFromCart = async function(productId) {
  this.cartItems = this.cartItems.filter(
    item => item.product.toString() !== productId
  );
  return this.save();
};

userSchema.methods.clearCart = async function() {
  this.cartItems = [];
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User; 
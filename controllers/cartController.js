// backend/controllers/cartController.js

import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js'; // Make sure Product model is imported

// Add or update cart items
const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // If cart already exists, find if the item is already in the cart
    const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

    if (itemIndex >= 0) {
      // If item exists, update quantity
      cart.cartItems[itemIndex].quantity = qty;
    } else {
      // Add new item to the cart
      cart.cartItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
      });
    }

    // Save the updated cart (totalPrice will be updated automatically by the pre-save hook)
    await cart.save();
    res.json(cart);
  } else {
    // If cart does not exist, create a new cart for the user
    const newCart = new Cart({
      user: req.user._id,
      cartItems: [{
        product: productId,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
      }],
    });

    const savedCart = await newCart.save();
    res.json(savedCart);
  }
});

// Remove item from cart
const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Remove the item from the cart
    cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

    // Save the cart (totalPrice will be updated automatically)
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});



// Get cart items for the logged-in user
const getCartItems = asyncHandler(async (req, res) => {
  // Fetch the cart for the logged-in user
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Send back the cart details, including the items and total price
    res.json({
      cartItems: cart.cartItems, // Array of cart items
      totalPrice: cart.totalPrice, // Total price calculated from the items
    });
  } else {
    // If no cart is found, return an error or send an empty cart response
    res.status(404).json({ message: 'Cart not found, creating a new cart' });
  }
});


export { addItemToCart, removeItemFromCart, getCartItems };


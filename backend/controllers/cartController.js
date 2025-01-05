import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc    Get cart items
// @route   GET /api/carts
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [],
      });
    }

    // Populate product details and handle missing products
    await cart.populate({
      path: 'cartItems.product',
      select: 'name price image countInStock',
    }).execPopulate();

    // Filter out cart items with missing products
    cart.cartItems = cart.cartItems.filter(item => item.product != null);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Get cart items error:', error);
    res.status(500).json({
      message: 'Failed to get cart items',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [],
      });
    }

    const cartItem = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: Math.min(Number(qty), product.countInStock),
    };

    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.cartItems[existingItemIndex] = cartItem;
    } else {
      cart.cartItems.push(cartItem);
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      message: 'Failed to add item to cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @desc    Remove item from cart
// @route   POST /api/cart/remove
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.cartItems = cart.cartItems.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  res.json(cart);
});

// @desc    Clear cart
// @route   POST /api/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.cartItems = [];
    await cart.save();
  }

  res.json({ message: 'Cart cleared' });
});

export { getCartItems, addToCart, removeFromCart, clearCart }; 
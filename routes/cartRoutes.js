import express from 'express';
import { addItemToCart, removeItemFromCart, getCartItems } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get the cart items for the logged-in user
router.get('/', protect, getCartItems);

// Route to add an item to the cart
router.post('/add', protect, addItemToCart);

// Route to remove an item from the cart
router.delete('/remove/:id', protect, removeItemFromCart);

export default router;

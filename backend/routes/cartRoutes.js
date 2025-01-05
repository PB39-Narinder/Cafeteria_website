import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/').get(protect, getCartItems);
router.route('/add').post(protect, addToCart);
router.route('/remove').post(protect, removeFromCart);
router.route('/clear').post(protect, clearCart);

export default router; 
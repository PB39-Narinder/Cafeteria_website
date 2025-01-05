import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

export const useCartItem = (productId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const item = cart.cartItems.find(item => item.product === productId);
  const quantity = item ? item.qty : 0;

  const updateQuantity = useCallback(async (newQty) => {
    if (isUpdating || !item) return;
    
    try {
      setIsUpdating(true);
      await dispatch(addToCart(productId, newQty));
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, productId, item, isUpdating]);

  const removeItem = useCallback(async () => {
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      await dispatch(removeFromCart(productId));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, productId, isUpdating]);

  return {
    item,
    quantity,
    updateQuantity,
    removeItem,
    isUpdating
  };
}; 
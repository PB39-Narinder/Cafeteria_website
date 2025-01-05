import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  loadCartItems,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} from '../actions/cartActions';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  const loadCart = useCallback(() => {
    dispatch(loadCartItems());
  }, [dispatch]);

  useEffect(() => {
    loadCart();
  }, [loadCart, userInfo]);

  const addItemToCart = async (productId, qty) => {
    await dispatch(addToCart(productId, qty));
  };

  const removeItemFromCart = async (productId) => {
    await dispatch(removeFromCart(productId));
  };

  const updateShipping = (shippingData) => {
    dispatch(saveShippingAddress(shippingData));
  };

  const updatePayment = (paymentMethod) => {
    dispatch(savePaymentMethod(paymentMethod));
  };

  const emptyCart = async () => {
    await dispatch(clearCart());
  };

  const getCartTotal = () => {
    return cart.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
  };

  const getItemCount = () => {
    return cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
  };

  const isItemInCart = (productId) => {
    return cart.cartItems.some(item => item.product === productId);
  };

  const getCartItem = (productId) => {
    return cart.cartItems.find(item => item.product === productId);
  };

  return {
    cart,
    addItemToCart,
    removeItemFromCart,
    updateShipping,
    updatePayment,
    emptyCart,
    getCartTotal,
    getItemCount,
    isItemInCart,
    getCartItem,
    loadCartItems: loadCart,
    isLoading: cart.loading,
    error: cart.error,
  };
}; 
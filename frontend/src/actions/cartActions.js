// src/actions/cartActions.js

import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_LOAD_ITEMS,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants';

// Helper function to validate cart data
const validateCartData = (data) => {
  if (!data) return { cartItems: [] };
  
  return {
    cartItems: Array.isArray(data.cartItems) ? data.cartItems : [],
    shippingAddress: data.shippingAddress || {},
    paymentMethod: data.paymentMethod || '',
  };
};

// Add item to cart
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const { data: product } = await axios.get(`/api/products/${productId}`);
    
    const cartItem = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: Number(qty),
    };

    if (userInfo) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/cart/add',
        { productId, qty },
        config
      );

      // Transform cart items
      const transformedItems = data.cartItems.map(item => ({
        product: item.product._id || item.product,
        name: item.product.name || item.name,
        image: item.product.image || item.image,
        price: item.product.price || item.price,
        countInStock: item.product.countInStock || item.countInStock,
        qty: item.qty,
      }));

      dispatch({
        type: CART_ADD_ITEM,
        payload: transformedItems,
      });
    } else {
      const currentCartItems = getState().cart.cartItems;
      const existItem = currentCartItems.find(x => x.product === productId);
      
      const cartItems = existItem
        ? currentCartItems.map(x =>
            x.product === existItem.product ? cartItem : x
          )
        : [...currentCartItems, cartItem];

      dispatch({
        type: CART_ADD_ITEM,
        payload: cartItems,
      });

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Remove item from cart (Update DB)
export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post('/api/cart/remove', { productId }, config);
    }

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId,
    });

    const { cart: { cartItems } } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

// Load cart items
export const loadCartItems = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo) {
      const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
      
      dispatch({
        type: CART_LOAD_ITEMS,
        payload: { cartItems },
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/cart', config);

    // Validate and transform cart items
    let transformedItems = [];
    if (data && data.cartItems && Array.isArray(data.cartItems)) {
      transformedItems = data.cartItems.map(item => {
        const product = item.product || {};
        return {
          product: product._id || item.product,
          name: product.name || item.name || '',
          image: product.image || item.image || '',
          price: product.price || item.price || 0,
          countInStock: product.countInStock || item.countInStock || 0,
          qty: parseInt(item.qty) || 1,
        };
      });
    }

    dispatch({
      type: CART_LOAD_ITEMS,
      payload: {
        cartItems: transformedItems,
        shippingAddress: data?.shippingAddress || {},
        paymentMethod: data?.paymentMethod || '',
      },
    });
  } catch (error) {
    console.error('Error loading cart:', error);
    // Load from localStorage as fallback
    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
    
    dispatch({
      type: CART_LOAD_ITEMS,
      payload: { cartItems },
    });
  }
};

// Save Shipping Address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// Save Payment Method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

// Clear cart
export const clearCart = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo) {
      await axios.post(
        '/api/cart/clear',
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    }

    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem('cartItems');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

// src/reducers/cartReducer.js
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_LOAD_ITEMS,
} from '../constants/cartConstants';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: '',
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_LOAD_ITEMS:
      return {
        ...state,
        cartItems: Array.isArray(action.payload.cartItems) 
          ? action.payload.cartItems 
          : [],
        shippingAddress: action.payload.shippingAddress || {},
        paymentMethod: action.payload.paymentMethod || '',
      };

    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: Array.isArray(action.payload) 
          ? action.payload 
          : [],
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

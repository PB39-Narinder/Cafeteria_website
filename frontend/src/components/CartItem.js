import React from 'react';
import { Link } from 'react-router-dom';
import { useCartItem } from '../hooks/useCartItem';

const CartItem = ({ productId }) => {
  const { item, quantity, updateQuantity, removeItem, isUpdating } = useCartItem(productId);

  if (!item) return null;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Link to={`/product/${item.product}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>
      <div className="cart-item-details">
        <Link to={`/product/${item.product}`} className="cart-item-name">
          <h3>{item.name}</h3>
        </Link>
        <p className="cart-item-price">₹{item.price}</p>
        <div className="cart-item-controls">
          <div className="quantity-controls">
            <button 
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1 || isUpdating}
              className="quantity-btn"
            >
              -
            </button>
            <span className="quantity-value">{quantity}</span>
            <button 
              onClick={() => updateQuantity(quantity + 1)}
              disabled={quantity >= item.countInStock || isUpdating}
              className="quantity-btn"
            >
              +
            </button>
          </div>
          <button 
            onClick={removeItem}
            disabled={isUpdating}
            className="remove-btn"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import CartItem from '../components/CartItem';

const CartScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  // Calculate totals
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  ).toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  const taxPrice = Number(0.15 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="cart-screen">
        <Container>
          <div className="cart-empty">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/menu" className="browse-btn">
              <i className="fas fa-coffee"></i> Browse Menu
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-screen">
      <Container>
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.product} productId={item.product} />
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-item">
              <span className="summary-label">Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
              <span className="summary-value">₹{itemsPrice}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">₹{shippingPrice}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Tax</span>
              <span className="summary-value">₹{taxPrice}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total</span>
              <span className="summary-value">₹{totalPrice}</span>
            </div>
            <button
              type="button"
              className="checkout-btn"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              <i className="fas fa-lock"></i> Proceed to Checkout
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartScreen;

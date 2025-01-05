import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = cart.cartItems.reduce((acc, item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    return acc + (qty * price);
  }, 0);

  cart.itemsPrice = addDecimals(itemsPrice);
  cart.shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice));

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, success, order, dispatch]);

  const placeOrderHandler = () => {
    const validOrderItems = cart.cartItems.map(item => ({
      name: item.name,
      qty: Number(item.qty) || 1,
      image: item.image,
      price: Number(item.price) || 0,
      product: item.product,
      sellerId: item.sellerId || '6476d06c0083c45db099bd65'
    }));

    const totalPrice = Number(cart.totalPrice);
    if (isNaN(totalPrice) || totalPrice < 0) {
      return;
    }

    dispatch(
      createOrder({
        orderItems: validOrderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: Number(cart.itemsPrice) || 0,
        shippingPrice: Number(cart.shippingPrice) || 0,
        totalPrice: totalPrice
      })
    );
  };

  return (
    <div className="place-order-screen">
      <Container>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col lg={8}>
            <div className="order-details">
              <div className="order-section">
                <h2>Delivery Address</h2>
                <div className="address-details">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="order-section">
                <h2>Payment Method</h2>
                <div className="payment-details">
                  <i className={cart.paymentMethod === 'COD' ? 'fas fa-money-bill-wave' : 'fas fa-credit-card'}></i>
                  <p>{cart.paymentMethod === 'COD' ? 'Cash on Delivery' : cart.paymentMethod}</p>
                </div>
              </div>

              <div className="order-section">
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <div className="order-items">
                    {cart.cartItems.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image">
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </div>
                        <div className="item-details">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <p className="item-quantity">
                            {item.qty} x ₹{item.price} = ₹{(Number(item.qty) * Number(item.price)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Items Total</span>
                  <span>₹{cart.itemsPrice}</span>
                </div>
                <div className="summary-item">
                  <span>Delivery</span>
                  <span>₹{cart.shippingPrice}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount</span>
                  <span>₹{cart.totalPrice}</span>
                </div>
              </div>

              {error && <Message variant="danger">{error}</Message>}

              <button
                type="button"
                className="place-order-btn"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Confirm Order
                <i className="fas fa-check-circle"></i>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceOrderScreen;

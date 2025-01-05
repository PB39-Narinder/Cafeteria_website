import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && order) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history]);

  const successPaymentHandler = () => {
    const paymentResult = {
      id: `PAY-${Date.now()}`,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      payer: { email_address: userInfo.email },
    };
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="order-screen">
      <Container>
        <div className="order-header">
          <h1>Order Details</h1>
          <p>Order #{order._id}</p>
        </div>

        <Row>
          <Col lg={8}>
            <div className="order-details">
              <div className="order-section">
                <h2>Delivery Information</h2>
                <div className="customer-details">
                  <div className="detail-item">
                    <span>Name:</span>
                    <p>{order.user.name}</p>
                  </div>
                  <div className="detail-item">
                    <span>Email:</span>
                    <p>
                      <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                  </div>
                  <div className="detail-item">
                    <span>Address:</span>
                    <p>
                      {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
                <div className="delivery-status">
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                    </Message>
                  ) : (
                    <Message variant="warning">Out for Delivery</Message>
                  )}
                </div>
              </div>

              <div className="order-section">
                <h2>Payment Information</h2>
                <div className="payment-details">
                  <div className="detail-item">
                    <span>Method:</span>
                    <p>{order.paymentMethod}</p>
                  </div>
                  <div className="payment-status">
                    {order.isPaid ? (
                      <Message variant="success">
                        Paid on {new Date(order.paidAt).toLocaleDateString()}
                      </Message>
                    ) : (
                      <Message variant="warning">Payment Pending</Message>
                    )}
                  </div>
                </div>
              </div>

              <div className="order-section">
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>No items in this order</Message>
                ) : (
                  <div className="order-items">
                    {order.orderItems.map((item, index) => (
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
                  <span>₹{order.itemsPrice}</span>
                </div>
                <div className="summary-item">
                  <span>Delivery</span>
                  <span>₹{order.shippingPrice}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount</span>
                  <span>₹{order.totalPrice}</span>
                </div>
              </div>

              {!order.isPaid && (
                <div className="payment-actions">
                  {loadingPay ? (
                    <Loader />
                  ) : (
                    <button
                      className="pay-now-btn"
                      onClick={successPaymentHandler}
                    >
                      Pay Now
                      <i className="fas fa-credit-card"></i>
                    </button>
                  )}
                </div>
              )}

              {loadingDeliver && <Loader />}
              
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div className="admin-actions">
                  <button
                    className="deliver-btn"
                    onClick={deliverHandler}
                  >
                    Mark as Delivered
                    <i className="fas fa-truck"></i>
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderScreen;

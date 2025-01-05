import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { Link } from 'react-router-dom';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="profile-screen">
      <Container>
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account settings and view orders</p>
        </div>

        <Row>
          <Col lg={4}>
            <div className="profile-card">
              <div className="profile-icon">
                <i className="fas fa-user-circle"></i>
              </div>
              <h2>Account Details</h2>
              {message && <Message variant="danger">{message}</Message>}
              {success && <Message variant="success">Profile Updated</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler} className="profile-form">
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  <button type="submit" className="update-btn">
                    Update Profile
                  </button>
                </Form>
              )}
            </div>
          </Col>

          <Col lg={8}>
            <div className="orders-card">
              <div className="orders-header">
                <h2>Order History</h2>
                <p>View and track your orders</p>
              </div>

              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
              ) : orders.length === 0 ? (
                <div className="empty-orders">
                  <i className="fas fa-shopping-bag"></i>
                  <p>No orders yet</p>
                  <Link to="/" className="shop-now-btn">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="orders-table-wrapper">
                  <Table responsive className="orders-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>₹{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <span className="status-badge success">
                                <i className="fas fa-check"></i> {order.paidAt.substring(0, 10)}
                              </span>
                            ) : (
                              <span className="status-badge pending">
                                <i className="fas fa-clock"></i> Pending
                              </span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span className="status-badge success">
                                <i className="fas fa-check"></i> {order.deliveredAt.substring(0, 10)}
                              </span>
                            ) : (
                              <span className="status-badge pending">
                                <i className="fas fa-clock"></i> Pending
                              </span>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <button className="view-btn">
                                View Details
                              </button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileScreen;

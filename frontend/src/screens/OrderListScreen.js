import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin || userInfo.isAdminSeller)) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <div className="order-list-screen">
      <Container>
        <div className="order-list-header">
          <h1>Order Management</h1>
          <p>Track and manage all customer orders</p>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <i className="fas fa-coffee"></i>
            <p>No orders received yet</p>
            <Link to="/" className="back-link">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-info">
                  <div className="order-header">
                    <h3>Order #{order._id}</h3>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="customer-info">
                    <div className="info-item">
                      <i className="fas fa-user"></i>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-money-bill-wave"></i>
                      <span>₹{order.totalPrice}</span>
                    </div>
                  </div>

                  <div className="order-status">
                    <div className="status-item">
                      <span>Payment:</span>
                      {order.isPaid ? (
                        <div className="status-badge success">
                          <i className="fas fa-check-circle"></i>
                          {new Date(order.paidAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="status-badge pending">
                          <i className="fas fa-clock"></i>
                          Pending
                        </div>
                      )}
                    </div>

                    <div className="status-item">
                      <span>Delivery:</span>
                      {order.isDelivered ? (
                        <div className="status-badge success">
                          <i className="fas fa-check-circle"></i>
                          {new Date(order.deliveredAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="status-badge pending">
                          <i className="fas fa-truck"></i>
                          In Progress
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="order-actions">
                  <Link to={`/order/${order._id}`} className="view-btn">
                    View Details
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default OrderListScreen

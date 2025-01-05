import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="user-list-screen">
      <Container>
        <div className="user-list-header">
          <h1>User Management</h1>
          <p>Manage your café's user accounts</p>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : users.length === 0 ? (
          <div className="empty-users">
            <i className="fas fa-users"></i>
            <p>No registered users yet</p>
            <Link to="/" className="back-link">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <div className="users-container">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-info">
                  <div className="user-header">
                    <div className="user-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="user-details">
                      <h3>{user.name}</h3>
                      <a href={`mailto:${user.email}`} className="user-email">
                        <i className="fas fa-envelope"></i>
                        {user.email}
                      </a>
                    </div>
                  </div>

                  <div className="user-roles">
                    <div className="role-badge">
                      <span>Admin Seller:</span>
                      {user.isAdminSeller ? (
                        <div className="status-badge success">
                          <i className="fas fa-check-circle"></i>
                          Yes
                        </div>
                      ) : (
                        <div className="status-badge pending">
                          <i className="fas fa-times-circle"></i>
                          No
                        </div>
                      )}
                    </div>

                    <div className="role-badge">
                      <span>Admin:</span>
                      {user.isAdmin ? (
                        <div className="status-badge success">
                          <i className="fas fa-check-circle"></i>
                          Yes
                        </div>
                      ) : (
                        <div className="status-badge pending">
                          <i className="fas fa-times-circle"></i>
                          No
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="user-actions">
                  <Link to={`/admin/user/${user._id}/edit`} className="edit-btn">
                    <i className="fas fa-edit"></i>
                    Edit User
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                    Remove User
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default UserListScreen;

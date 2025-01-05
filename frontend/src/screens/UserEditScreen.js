import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminSeller, setIsAdminSeller] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsAdminSeller(user.isAdminSeller);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdminSeller, isAdmin }));
  };

  return (
    <div className="user-edit-screen">
      <Container>
        <Link to="/admin/userlist" className="back-btn">
          <i className="fas fa-arrow-left"></i> Back to Users
        </Link>

        <FormContainer>
          <div className="edit-header">
            <div className="user-icon">
              <i className="fas fa-user-edit"></i>
            </div>
            <h1>Edit User</h1>
            <p>Update user information and permissions</p>
          </div>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} className="edit-form">
              <div className="form-group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="permissions-section">
                <h3>User Permissions</h3>
                <div className="permissions-grid">
                  <div className="permission-item">
                    <Form.Check
                      type="checkbox"
                      label="Admin Seller"
                      id="isAdminSeller"
                      checked={isAdminSeller}
                      onChange={(e) => setIsAdminSeller(e.target.checked)}
                    />
                    <p>Can manage products and view orders</p>
                  </div>

                  <div className="permission-item">
                    <Form.Check
                      type="checkbox"
                      label="Admin"
                      id="isAdmin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <p>Full administrative access</p>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="update-btn">
                  Update User
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </Form>
          )}
        </FormContainer>
      </Container>
    </div>
  );
};

export default UserEditScreen;

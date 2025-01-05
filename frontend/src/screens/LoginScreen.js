import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="auth-screen">
      <Container>
        <div className="auth-wrapper">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">
                <i className="fas fa-user-circle"></i>
              </div>
              <h1>Welcome Back</h1>
              <p>Sign in to your account</p>
            </div>

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler} className="auth-form">
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <button type="submit" className="auth-btn">
                Sign In
              </button>
            </Form>

            <div className="auth-footer">
              <p>
                New customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginScreen;

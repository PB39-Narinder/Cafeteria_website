import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand">
              <i className="fas fa-coffee"></i> CaféDelight
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            
            <Nav className="ms-auto">
              <LinkContainer to="/menu">
                <Nav.Link>
                  <i className="fas fa-utensils"></i> Menu
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/services">
                <Nav.Link>
                  <i className="fas fa-concierge-bell"></i> Services
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                  {cartItems.length > 0 && (
                    <span className="cart-badge">
                      {cartItems.reduce((acc, item) => acc + (parseInt(item.qty) || 0), 0)}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user"></i> {userInfo.name}
                    </span>
                  }
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user-circle"></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to="/orders">
                    <NavDropdown.Item>
                      <i className="fas fa-list"></i> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  
                  {userInfo.isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>
                          <i className="fas fa-users"></i> Users
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>
                          <i className="fas fa-coffee"></i> Products
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>
                          <i className="fas fa-clipboard-list"></i> Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

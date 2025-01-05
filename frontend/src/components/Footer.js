import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-center">
          <Col md={4} className="text-center mb-4 mb-md-0">
            <h3 className="footer-brand">
              <i className="fas fa-coffee"></i> CaféDelight
            </h3>
            <p className="footer-tagline">Where Flavors Meet Comfort</p>
          </Col>

          <Col md={4} className="text-center mb-4 mb-md-0">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          <Col md={4} className="text-center">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p><i className="fas fa-map-marker-alt"></i> 123 Coffee Street</p>
              <p><i className="fas fa-phone"></i> (555) 123-4567</p>
              <p><i className="fas fa-envelope"></i> info@cafedelight.com</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center mt-4">
            <div className="footer-bottom">
              <p className="hours">Open Daily: 8:00 AM - 10:00 PM</p>
              <p className="copyright">
                &copy; {currentYear} CaféDelight. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

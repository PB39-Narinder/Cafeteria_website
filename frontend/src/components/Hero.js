import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6} className="hero-content">
            <h1 className="hero-title">Welcome to CaféDelight</h1>
            <p className="hero-subtitle">
              Experience the perfect blend of artisanal coffee and delightful treats
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="menu-btn">
                <i className="fas fa-utensils"></i>
                View Menu
              </Link>
              <Link to="/services/custom-coffee" className="custom-btn">
                <i className="fas fa-coffee"></i>
                Custom Coffee
              </Link>
            </div>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-coffee"></i>
                <span>Premium Coffee</span>
              </div>
              <div className="feature">
                <i className="fas fa-bread-slice"></i>
                <span>Fresh Bakes</span>
              </div>
              <div className="feature">
                <i className="fas fa-wifi"></i>
                <span>Free WiFi</span>
              </div>
            </div>
          </Col>
          <Col lg={6} className="hero-image">
            <div className="image-wrapper">
              <img
                src="/images/hero-coffee.jpg"
                alt="Café Delight Coffee"
                className="main-image"
              />
              <div className="floating-image top">
                <img
                  src="/images/coffee-beans.jpg"
                  alt="Coffee Beans"
                  className="accent-image"
                />
              </div>
              <div className="floating-image bottom">
                <img
                  src="/images/pastries.jpg"
                  alt="Fresh Pastries"
                  className="accent-image"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero; 
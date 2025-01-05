import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const WifiCoworking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setShowSuccess(true);
      setShowError(false);
      console.log('Wi-Fi pass requested for:', name, email);
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <div className="cafe-wifi-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="wifi-content">
            <div className="wifi-header">
              <div className="icon-wrapper">
                <i className="fas fa-wifi"></i>
              </div>
              <h1>Wi-Fi & Co-working Space</h1>
              <p className="subtitle">Your perfect workspace away from home</p>
            </div>

            <div className="features-grid">
              <div className="feature-item">
                <i className="fas fa-bolt"></i>
                <h4>High-Speed Internet</h4>
                <p>Fast and reliable Wi-Fi connection</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-plug"></i>
                <h4>Power Outlets</h4>
                <p>Accessible charging points</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-coffee"></i>
                <h4>Fresh Coffee</h4>
                <p>Complimentary coffee service</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <h4>Community</h4>
                <p>Vibrant co-working atmosphere</p>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="wifi-form-container">
              <h2>Get Your Wi-Fi Pass</h2>
              <p>Fill out the form below to receive your complimentary Wi-Fi access</p>

              {showSuccess && (
                <div className="alert-success">
                  Wi-Fi pass request submitted successfully! Check your email.
                </div>
              )}
              {showError && (
                <div className="alert-error">
                  Please fill in all fields to request the Wi-Fi pass.
                </div>
              )}

              <Form onSubmit={handleSubmit} className="wifi-form">
                <Form.Group className="form-group">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>

                <Button type="submit" className="submit-btn">
                  Request Wi-Fi Pass
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WifiCoworking;

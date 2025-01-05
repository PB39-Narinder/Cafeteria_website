import React, { useState } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomCoffee = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferences: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = (modalType) => {
    if (modalType === 'create') {
      setShowCreateModal(false);
    } else {
      setShowExpertModal(false);
    }
    setShowSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferences: '',
      message: ''
    });
  };

  const handleShow = (modalType) => {
    if (modalType === 'create') {
      setShowCreateModal(true);
    } else {
      setShowExpertModal(true);
    }
  };

  const handleSubmit = (e, modalType) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    // Close modal after 2 seconds
    setTimeout(() => {
      handleClose(modalType);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const customizationSteps = [
    {
      icon: 'fas fa-coffee-bean',
      title: 'Choose Your Beans',
      description: 'Select from our premium single-origin coffee beans',
      items: ['Ethiopian Yirgacheffe', 'Colombian Supremo', 'Sumatra Mandheling', 'Brazilian Santos']
    },
    {
      icon: 'fas fa-fire',
      title: 'Select Roast Level',
      description: 'Pick your preferred roasting intensity',
      items: ['Light Roast', 'Medium Roast', 'Dark Roast', 'French Roast']
    },
    {
      icon: 'fas fa-mortar-pestle',
      title: 'Grinding Options',
      description: 'Choose your ideal grind size',
      items: ['Whole Bean', 'Coarse', 'Medium', 'Fine']
    }
  ];

  return (
    <div className="cafe-custom-section">
      <Container>
        <div className="custom-header">
          <div className="icon-wrapper">
            <i className="fas fa-coffee"></i>
          </div>
          <h1>Custom Coffee Blends</h1>
          <p className="subtitle">Craft Your Perfect Cup</p>
        </div>

        <Row className="custom-intro">
          <Col lg={6}>
            <div className="intro-content">
              <h2>Create Your Signature Blend</h2>
              <p>
                Experience coffee craftsmanship at its finest. Our master roasters 
                will help you create a personalized coffee blend that matches your 
                unique taste preferences. Choose from our selection of premium beans, 
                roasting profiles, and optional flavor infusions.
              </p>
              <div className="intro-features">
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Premium Single-Origin Beans</span>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Custom Roasting Profiles</span>
                </div>
                <div className="feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Expert Roaster Guidance</span>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="process-preview">
              <div className="preview-card">
                <div className="card-icon">
                  <i className="fas fa-magic"></i>
                </div>
                <h3>Your Coffee, Your Way</h3>
                <p>
                  From bean selection to roast level, create a blend that's 
                  uniquely yours. Our expert roasters will guide you through 
                  the process to ensure the perfect cup.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <div className="customization-steps">
          {customizationSteps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">
                <i className={step.icon}></i>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul className="step-items">
                {step.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="custom-cta">
          <h2>Ready to Create Your Blend?</h2>
          <p>
            Start your journey to the perfect cup of coffee. Our master roasters 
            are ready to help you craft your signature blend.
          </p>
          <div className="cta-buttons">
            <button onClick={() => handleShow('create')} className="primary-btn">
              Start Creating
            </button>
            <button onClick={() => handleShow('expert')} className="secondary-btn">
              Ask an Expert
            </button>
          </div>
        </div>

        {/* Create Blend Modal */}
        <Modal 
          show={showCreateModal} 
          onHide={() => handleClose('create')}
          centered
          className="cafe-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Your Custom Blend</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showSuccess ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <p>Thank you! We'll start crafting your perfect blend.</p>
              </div>
            ) : (
              <Form onSubmit={(e) => handleSubmit(e, 'create')}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Coffee Preferences</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your preferred coffee taste (e.g., roast level, flavor notes)"
                    required
                  />
                </Form.Group>

                <button type="submit" className="submit-btn">
                  Create My Blend
                </button>
              </Form>
            )}
          </Modal.Body>
        </Modal>

        {/* Ask Expert Modal */}
        <Modal 
          show={showExpertModal} 
          onHide={() => handleClose('expert')}
          centered
          className="cafe-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ask Our Coffee Expert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showSuccess ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <p>Thank you! Our expert will get back to you soon.</p>
              </div>
            ) : (
              <Form onSubmit={(e) => handleSubmit(e, 'expert')}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone (optional)</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Your Question</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What would you like to know about our coffee?"
                    required
                  />
                </Form.Group>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default CustomCoffee;

import React, { useState } from 'react';
import { Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FreshBakes = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setShowSuccess(false);
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', formData);
    setShowSuccess(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    // Close modal after 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const bakeItems = [
    {
      icon: 'fas fa-bread-slice',
      title: 'Artisan Breads',
      description: 'From crusty baguettes to soft sourdough, our artisan breads are crafted with love and tradition.',
      items: ['Sourdough', 'Baguettes', 'Whole Grain', 'Rye Bread']
    },
    {
      icon: 'fas fa-cookie',
      title: 'Fresh Pastries',
      description: 'Indulge in our buttery croissants and delicate Danish pastries, baked fresh daily.',
      items: ['Croissants', 'Danish', 'Scones', 'Muffins']
    },
    {
      icon: 'fas fa-birthday-cake',
      title: 'Cakes & Desserts',
      description: 'Celebrate with our signature cakes and delightful desserts for any occasion.',
      items: ['Custom Cakes', 'Cupcakes', 'Tarts', 'Brownies']
    }
  ];

  return (
    <div className="cafe-bakes-section">
      <Container>
        <div className="bakes-header">
          <div className="icon-wrapper">
            <i className="fas fa-cookie-bite"></i>
          </div>
          <h1>Fresh Bakes Daily</h1>
          <p className="subtitle">Handcrafted with love, baked to perfection</p>
        </div>

        <Row className="bakes-intro">
          <Col lg={6}>
            <div className="intro-content">
              <h2>Our Artisanal Approach</h2>
              <p>
                Every morning, our master bakers craft delicious treats using time-honored 
                techniques and the finest ingredients. From crusty artisan breads to delicate 
                pastries, each item is made with passion and attention to detail.
              </p>
              <Link to="/products" className="cafe-btn">
                View Our Menu
              </Link>
            </div>
          </Col>
          <Col lg={6}>
            <div className="quality-features">
              <div className="quality-item">
                <i className="fas fa-wheat-alt"></i>
                <h4>Premium Ingredients</h4>
                <p>Carefully selected, high-quality ingredients</p>
              </div>
              <div className="quality-item">
                <i className="fas fa-clock"></i>
                <h4>Fresh Daily</h4>
                <p>Baked fresh every morning</p>
              </div>
              <div className="quality-item">
                <i className="fas fa-award"></i>
                <h4>Artisanal Quality</h4>
                <p>Traditional recipes & techniques</p>
              </div>
              <div className="quality-item">
                <i className="fas fa-leaf"></i>
                <h4>Natural Process</h4>
                <p>No artificial additives</p>
              </div>
            </div>
          </Col>
        </Row>

        <div className="bakes-categories">
          {bakeItems.map((category, index) => (
            <div key={index} className="bake-category">
              <div className="category-icon">
                <i className={category.icon}></i>
              </div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ul className="category-items">
                {category.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="order-section">
          <h2>Special Orders</h2>
          <p>
            Planning a celebration or event? We take custom orders for special occasions.
            Contact us to discuss your requirements.
          </p>
          <div className="order-actions">
            <button onClick={handleShow} className="contact-btn">
              Contact Us
            </button>
            <Link to="/products" className="menu-btn">
              View Full Menu
            </Link>
          </div>
        </div>

        {/* Contact Modal */}
        <Modal 
          show={showModal} 
          onHide={handleClose}
          centered
          className="cafe-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Contact Us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showSuccess ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
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
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your order requirements"
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

export default FreshBakes;

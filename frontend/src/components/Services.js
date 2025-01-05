import React from 'react';
import { Container } from 'react-bootstrap';
import { services } from '../constants/servicesConstants';

const Services = () => {
  return (
    <div className="services-section">
      <Container>
        <div className="services-header">
          <h1>Why Choose Us</h1>
          <p>Experience the difference</p>
        </div>

        <div className="services-intro">
          <p>
            At CaféDelight, we offer a warm and inviting space where exceptional
            flavors and comforting experiences come together. From handcrafted
            beverages to freshly baked treats, we bring people together to savor
            the best of café culture.
          </p>
        </div>

        <div className="services-grid">
          {services.map(({ id, icon, title, text }) => (
            <div key={id} className="service-card">
              <div className="service-icon">
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;

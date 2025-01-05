import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import aboutImg from '../assets/images/about-img.jpg';

const About = () => {
  return (
    <div className="about-section">
      <Container>
        <div className="about-header">
          <h1>Our Story</h1>
          <p>A journey of passion and dedication</p>
        </div>

        <Row className="about-content">
          <Col lg={6}>
            <div className="about-image">
              <img src={aboutImg} alt="About our cafeteria" />
            </div>
          </Col>

          <Col lg={6}>
            <div className="about-text">
              <h2>About Our Cafeteria</h2>
              <div className="divider"></div>
              
              <p>
                <strong>CafeteriaDelight</strong> is dedicated to creating a vibrant
                and inclusive space where food, culture, and community come together.
                Our cafeteria offers a perfect blend of traditional and modern dining
                experiences, ensuring there's something for everyone to savor.
              </p>

              <p>
                Whether it's the smell of freshly brewed coffee, the taste of
                handcrafted pastries, or hearty meals made with locally sourced
                ingredients, we aim to delight your senses.
              </p>

              <p>
                Our mission is to redefine cafeteria culture by fostering connections
                and celebrating culinary diversity. By incorporating innovative menu
                options and promoting sustainable practices, we hope to provide not
                just a meal but a memorable experience for all our visitors.
              </p>

              <p>
                At <strong>CafeteriaDelight</strong>, we believe that every meal is
                an opportunity to create lasting memories. Join us for a unique
                experience where comfort, quality, and community take center stage.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;

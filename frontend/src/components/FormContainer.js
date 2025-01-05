import React from 'react';
import { Container } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <div className="form-container">
      <Container>
        <div className="form-wrapper">
          <div className="form-content">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FormContainer;

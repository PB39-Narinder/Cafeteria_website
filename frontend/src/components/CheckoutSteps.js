import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="checkout-steps">
      <div className="step-item">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              <div className="step-content">
                <div className="step-number completed">1</div>
                <span>Welcome</span>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className="step-content">
              <div className="step-number">1</div>
              <span>Welcome</span>
            </div>
          </Nav.Link>
        )}
      </div>

      <div className="step-item">
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              <div className="step-content">
                <div className="step-number completed">2</div>
                <span>Delivery</span>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className="step-content">
              <div className="step-number">2</div>
              <span>Delivery</span>
            </div>
          </Nav.Link>
        )}
      </div>

      <div className="step-item">
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              <div className="step-content">
                <div className="step-number completed">3</div>
                <span>Payment</span>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className="step-content">
              <div className="step-number">3</div>
              <span>Payment</span>
            </div>
          </Nav.Link>
        )}
      </div>

      <div className="step-item">
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              <div className="step-content">
                <div className="step-number completed">4</div>
                <span>Confirm Order</span>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <div className="step-content">
              <div className="step-number">4</div>
              <span>Confirm Order</span>
            </div>
          </Nav.Link>
        )}
      </div>
    </Nav>
  )
}

export default CheckoutSteps

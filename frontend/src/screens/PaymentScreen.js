import React, { useState } from 'react';
import { Form, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const dispatch = useDispatch();

  const handlePaymentSelect = (option) => {
    setSelectedOption(option);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedOption(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  const paymentOptions = [
    {
      id: 'UPI',
      label: 'UPI Payment',
      description: 'Pay instantly using any UPI app',
      icon: 'fas fa-mobile-alt',
      modalContent: {
        title: 'UPI Payment',
        content: (
          <div className="payment-modal-content">
            <div className="qr-code-section">
              <i className="fas fa-qrcode qr-icon"></i>
              <p>Scan QR Code to Pay</p>
            </div>
            <div className="upi-id-section">
              <h4>Or Pay using UPI ID</h4>
              <div className="upi-id">cafe@upi</div>
              <button className="copy-btn">
                <i className="fas fa-copy"></i> Copy UPI ID
              </button>
            </div>
          </div>
        )
      }
    },
    {
      id: 'Razorpay',
      label: 'Card / Net Banking',
      description: 'Pay securely with credit/debit card or net banking',
      icon: 'fas fa-credit-card',
      modalContent: {
        title: 'Card / Net Banking Payment',
        content: (
          <div className="payment-modal-content">
            <Form className="card-payment-form">
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="1234 5678 9012 3456" />
              </Form.Group>
              <div className="card-details">
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="text" placeholder="MM/YY" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="password" placeholder="***" />
                </Form.Group>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Card Holder Name</Form.Label>
                <Form.Control type="text" placeholder="Name on card" />
              </Form.Group>
            </Form>
          </div>
        )
      }
    },
    {
      id: 'PayPal',
      label: 'PayPal',
      description: 'Safe and secure international payments',
      icon: 'fab fa-paypal',
      modalContent: {
        title: 'PayPal Payment',
        content: (
          <div className="payment-modal-content">
            <div className="paypal-section">
              <i className="fab fa-paypal paypal-icon"></i>
              <p>You will be redirected to PayPal to complete your payment</p>
              <button className="paypal-btn">
                Continue with PayPal
              </button>
            </div>
          </div>
        )
      }
    },
    {
      id: 'COD',
      label: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: 'fas fa-money-bill-wave',
      modalContent: {
        title: 'Cash on Delivery',
        content: (
          <div className="payment-modal-content">
            <div className="cod-section">
              <i className="fas fa-hand-holding-usd cod-icon"></i>
              <h4>Pay on Delivery</h4>
              <p>Please keep exact change ready for a contactless delivery experience</p>
              <div className="amount-details">
                <span>Order Amount:</span>
                <span>₹{cart.totalPrice}</span>
              </div>
            </div>
          </div>
        )
      }
    }
  ];

  return (
    <div className="payment-screen">
      <Container>
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <div className="payment-header">
            <h1>Choose Payment Method</h1>
            <p>Select your preferred way to pay</p>
          </div>

          <Form onSubmit={submitHandler} className="payment-form">
            <div className="payment-options">
              {paymentOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`payment-option ${paymentMethod === option.id ? 'selected' : ''}`}
                  onClick={() => {
                    setPaymentMethod(option.id);
                    handlePaymentSelect(option);
                  }}
                >
                  <input
                    type="radio"
                    id={option.id}
                    name="paymentMethod"
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor={option.id} className="payment-label">
                    <div className="payment-icon">
                      <i className={option.icon}></i>
                    </div>
                    <div className="payment-info">
                      <h3>{option.label}</h3>
                      <p>{option.description}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <button type="submit" className="continue-btn">
              Continue to Review Order
              <i className="fas fa-arrow-right"></i>
            </button>
          </Form>
        </FormContainer>

        <Modal 
          show={showModal} 
          onHide={handleModalClose}
          className="payment-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedOption?.modalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOption?.modalContent.content}
          </Modal.Body>
          <Modal.Footer>
            <button className="cancel-btn" onClick={handleModalClose}>
              Cancel
            </button>
            <button className="proceed-btn" onClick={submitHandler}>
              Proceed to Pay
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default PaymentScreen;

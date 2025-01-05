import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import { contactItems } from '../constants/contactConstant';

const Contact = () => {
  return (
    <div className="contact-section">
      <Container>
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you</p>
        </div>

        <div className="contact-content">
          <ContactDetails />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
};

const ContactDetails = () => (
  <div className="contact-info">
    <div className="info-header">
      <h2>Contact Information</h2>
      <p>
        Have questions about our coffee or services? We're here to help! Reach out through any of these channels.
      </p>
    </div>
    
    <div className="contact-items">
      {contactItems.map((item) => (
        <div key={item.id} className="contact-item">
          <div className="item-icon">
            {item.icon}
          </div>
          <div className="item-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xyyapqwr');

  return (
    <div className="contact-form-wrapper">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>{state.succeeded ? 'Message Sent!' : 'Send us a Message'}</h2>
        
        <div className="form-grid">
          <FormControl 
            label="Name" 
            name="name" 
            type="text" 
            required 
          />
          <FormControl 
            label="Email" 
            name="email" 
            type="email" 
            required 
          />
        </div>

        <FormControl 
          label="Subject" 
          name="subject" 
          type="text" 
          required 
        />
        
        <FormControl 
          label="Message" 
          name="message" 
          type="textarea" 
          placeholder="Tell us what's on your mind..." 
          required 
        />

        <ValidationError 
          prefix="Message" 
          field="message" 
          errors={state.errors} 
        />

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={state.submitting}
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

const FormControl = ({ label, name, type, placeholder, required }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    {type === 'textarea' ? (
      <textarea 
        id={name}
        name={name} 
        placeholder={placeholder} 
        required={required}
      />
    ) : (
      <input 
        id={name}
        type={type} 
        name={name} 
        required={required} 
      />
    )}
  </div>
);

export default Contact;

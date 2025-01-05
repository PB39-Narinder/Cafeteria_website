import React from 'react'

const Message = ({ variant, children }) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return 'fas fa-check-circle';
      case 'danger':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <div className={`cafe-alert ${variant}`}>
      <div className="alert-icon">
        <i className={getIcon()}></i>
      </div>
      <div className="alert-content">{children}</div>
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message

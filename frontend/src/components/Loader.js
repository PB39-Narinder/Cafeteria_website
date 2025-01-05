import React from 'react';

const Loader = () => {
  return (
    <div className="cafe-loader">
      <div className="loader-content">
        <div className="coffee-cup">
          <i className="fas fa-mug-hot"></i>
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;

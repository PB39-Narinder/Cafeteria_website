import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color = '#f8e825', size = '1rem' }) => {
  return (
    <div className='rating' style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          <i
            style={{ color }}
            className={
              value >= index
                ? 'fas fa-star'
                : value >= index - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}
      {text && <span className="rating-text">{text}</span>}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string
};

export default Rating;
